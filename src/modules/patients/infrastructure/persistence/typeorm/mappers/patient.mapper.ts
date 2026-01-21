import { Injectable } from '@nestjs/common';
import { Patient, PatientStatus } from '../../../../domain/entities/patient.entity';
import { PatientOrmEntity } from '../entities/patient.orm-entity';
import { EncryptionService } from '../../../../../../shared/infrastructure/security/encryption.service';

@Injectable()
export class PatientMapper {
  constructor(private readonly encryptionService: EncryptionService) {}

  toDomain(ormEntity: PatientOrmEntity): Patient {
    const decryptedMetadata = this.encryptionService.decryptObject(ormEntity.metadata);
    
    return new Patient(
      ormEntity.id,
      ormEntity.name,
      ormEntity.ra,
      ormEntity.age,
      ormEntity.birthDate,
      ormEntity.status as PatientStatus,
      ormEntity.protocol,
      decryptedMetadata,
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }

  toOrm(domainEntity: Patient): PatientOrmEntity {
    const ormEntity = new PatientOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.ra = String(domainEntity.ra);
    ormEntity.age = domainEntity.age;
    ormEntity.birthDate = domainEntity.birthDate;
    ormEntity.status = domainEntity.status;
    ormEntity.protocol = domainEntity.protocol;
    
    ormEntity.metadata = this.encryptionService.encryptObject(domainEntity.metadata);
    
    return ormEntity;
  }
}
