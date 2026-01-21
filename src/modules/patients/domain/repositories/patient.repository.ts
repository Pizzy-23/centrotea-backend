import { Patient, PatientStatus } from '../entities/patient.entity';
import { CursorPaginationDto, PaginatedResult } from '../../../../shared/domain/dtos/pagination.dto';

export interface PatientFilters {
  name?: string;
  ra?: string | number;
  status?: PatientStatus;
  protocol?: string;
}

export interface PatientRepository {
  save(patient: Patient): Promise<Patient>;
  findById(id: string): Promise<Patient | null>;
  findByRa(ra: string | number): Promise<Patient | null>;
  findAll(filters?: PatientFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<Patient>>;
}
