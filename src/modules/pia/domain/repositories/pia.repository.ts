import { PIA } from '../entities/pia.entity';
import { CursorPaginationDto, PaginatedResult } from '../../../../shared/domain/dtos/pagination.dto';

export interface PIAFilters {
  patientId?: string;
  status?: 'active' | 'archived';
}

export interface PIARepository {
  save(pia: PIA): Promise<PIA>;
  findAll(filters?: PIAFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<PIA>>;
  findById(id: string): Promise<PIA | null>;
  findByPatientId(patientId: string, filters?: PIAFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<PIA>>;
  findActiveByPatientId(patientId: string): Promise<PIA | null>;
}
