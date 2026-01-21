import { EvolutionReport } from '../entities/evolution-report.entity';
import { CursorPaginationDto, PaginatedResult } from '../../../../shared/domain/dtos/pagination.dto';

export interface EvolutionReportFilters {
  patientId?: string;
  professionalId?: string;
  month?: number;
  year?: number;
}

export interface EvolutionReportRepository {
  save(report: EvolutionReport): Promise<EvolutionReport>;
  findAll(filters?: EvolutionReportFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<EvolutionReport>>;
  findById(id: string): Promise<EvolutionReport | null>;
  findByPatientId(patientId: string, filters?: EvolutionReportFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<EvolutionReport>>;
}
