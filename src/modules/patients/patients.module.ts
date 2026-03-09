import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientOrmEntity } from './infrastructure/persistence/typeorm/entities/patient.orm-entity';
import { PatientMapper } from './infrastructure/persistence/typeorm/mappers/patient.mapper';
import { TypeOrmPatientRepository } from './infrastructure/persistence/typeorm/repositories/typeorm-patient.repository';
import { PatientsController } from './infrastructure/controllers/patients.controller';
import { PatientsResolver } from './infrastructure/resolvers/patients.resolver';
import { CreatePatientUseCase } from './application/use-cases/create-patient.use-case';
import { FindAllPatientsUseCase } from './application/use-cases/find-all-patients.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PatientOrmEntity])],
  controllers: [PatientsController],
  providers: [
    PatientMapper,
    {
      provide: 'PatientRepository',
      useClass: TypeOrmPatientRepository,
    },
    CreatePatientUseCase,
    FindAllPatientsUseCase,
    PatientsResolver,
  ],
  exports: ['PatientRepository'],
})
export class PatientsModule {}
