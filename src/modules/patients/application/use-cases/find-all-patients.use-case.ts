import { Injectable } from '@nestjs/common';
import { PatientRepository, PatientFilters } from '../../domain/repositories/patient.repository';
import { Patient } from '../../domain/entities/patient.entity';
import { CursorPaginationDto, PaginatedResult } from '../../../../shared/domain/dtos/pagination.dto';

@Injectable()
export class FindAllPatientsUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(filters?: PatientFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<Patient>> {
    return await this.patientRepository.findAll(filters, pagination);
  }
}
