import { Professional } from '../entities/professional.entity';
import { CursorPaginationDto, PaginatedResult } from '../../../../shared/domain/dtos/pagination.dto';

export interface ProfessionalFilters {
  name?: string;
  email?: string;
  specialty?: string;
}

export interface ProfessionalRepository {
  save(professional: Professional): Promise<Professional>;
  findAll(filters?: ProfessionalFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<Professional>>;
  findById(id: string): Promise<Professional | null>;
  findByUserId(userId: string): Promise<Professional | null>;
}
