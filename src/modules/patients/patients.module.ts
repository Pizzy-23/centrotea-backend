import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientOrmEntity } from './infrastructure/persistence/typeorm/entities/patient.orm-entity';
import { PatientMapper } from './infrastructure/persistence/typeorm/mappers/patient.mapper';
import { TypeOrmPatientRepository } from './infrastructure/persistence/typeorm/repositories/typeorm-patient.repository';
import { PatientsController } from './infrastructure/controllers/patients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PatientOrmEntity])],
  controllers: [PatientsController],
  providers: [
    PatientMapper,
    {
      provide: 'PatientRepository',
      useClass: TypeOrmPatientRepository,
    },
  ],
  exports: ['PatientRepository'],
})
export class PatientsModule {}
