import { Injectable, ConflictException } from '@nestjs/common';
import { PatientRepository } from '../../domain/repositories/patient.repository';
import { CreatePatientDto } from '../dtos/create-patient.dto';
import { Patient, PatientStatus } from '../../domain/entities/patient.entity';

@Injectable()
export class CreatePatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(dto: CreatePatientDto): Promise<Patient> {
    const existingPatient = await this.patientRepository.findByRa(dto.ra);
    if (existingPatient) {
      throw new ConflictException(`Patient with RA ${dto.ra} already exists`);
    }

    const patient = Patient.create({
      name: dto.name,
      ra: dto.ra,
      age: dto.age,
      birthDate: new Date(dto.birthDate),
      status: dto.status || PatientStatus.ACTIVE,
      protocol: dto.protocol,
      metadata: dto.metadata || {},
    });

    return await this.patientRepository.save(patient);
  }
}
