import { Workshop } from '../entities/workshop.entity';
import { CursorPaginationDto, PaginatedResult } from '../../../../shared/domain/dtos/pagination.dto';

export interface WorkshopFilters {
  title?: string;
  status?: 'active' | 'inactive';
}

export interface WorkshopRepository {
  save(workshop: Workshop): Promise<void>;
  findAll(filters?: WorkshopFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<Workshop>>;
  findById(id: string): Promise<Workshop | null>;
}
