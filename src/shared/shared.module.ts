import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptionService } from './infrastructure/security/encryption.service';
import { CustomCacheModule } from './infrastructure/cache/cache.module';

@Global()
@Module({
  imports: [ConfigModule, CustomCacheModule],
  providers: [EncryptionService],
  exports: [EncryptionService, CustomCacheModule],
})
export class SharedModule {}
