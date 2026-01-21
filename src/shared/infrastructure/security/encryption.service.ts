import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor(private configService: ConfigService) {
    const secret = this.configService.get<string>('ENCRYPTION_KEY');
    if (!secret || secret.length !== 64) {
      throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)');
    }
    this.key = Buffer.from(secret, 'hex');
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    // Format: iv:authTag:encrypted
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  decrypt(hash: string): string {
    const [ivHex, authTagHex, encryptedText] = hash.split(':');
    
    if (!ivHex || !authTagHex || !encryptedText) {
      throw new Error('Invalid encrypted format');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  encryptObject(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return this.encrypt(String(obj));
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.encryptObject(item));
    }

    const encryptedObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const encryptedKey = this.encrypt(key);
      encryptedObj[encryptedKey] = this.encryptObject(value);
    }
    return encryptedObj;
  }

  decryptObject(obj: any): any {
    if (typeof obj === 'string') {
      try {
        return this.decrypt(obj);
      } catch {
        return obj;
      }
    }

    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.decryptObject(item));
    }

    const decryptedObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const decryptedKey = this.decrypt(key);
      decryptedObj[decryptedKey] = this.decryptObject(value);
    }
    return decryptedObj;
  }
}
