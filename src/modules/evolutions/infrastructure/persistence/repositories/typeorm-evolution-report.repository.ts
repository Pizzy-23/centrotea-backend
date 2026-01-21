import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvolutionReportRepository, EvolutionReportFilters } from '../../../domain/repositories/evolution-report.repository';
import { EvolutionReport } from '../../../domain/entities/evolution-report.entity';
import { EvolutionReportOrmEntity } from '../entities/evolution-report.orm-entity';
import { EvolutionReportMapper } from '../../mappers/evolution-report.mapper';
import { CursorPaginationDto, PaginatedResult } from '../../../../../shared/domain/dtos/pagination.dto';
import { CursorPaginationHelper } from '../../../../../shared/domain/utils/cursor-pagination.helper';

@Injectable()
export class TypeOrmEvolutionReportRepository implements EvolutionReportRepository {
  constructor(
    @InjectRepository(EvolutionReportOrmEntity)
    private readonly ormRepository: Repository<EvolutionReportOrmEntity>,
  ) {}

  async save(report: EvolutionReport): Promise<EvolutionReport> {
    const ormEntity = EvolutionReportMapper.toOrm(report);
    const savedEntity = await this.ormRepository.save(ormEntity);
    return EvolutionReportMapper.toDomain(savedEntity);
  }

  async findAll(filters?: EvolutionReportFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<EvolutionReport>> {
    const queryBuilder = this.ormRepository.createQueryBuilder('evolution');

    if (filters) {
      if (filters.patientId) {
        queryBuilder.andWhere('evolution.patientId = :patientId', { patientId: filters.patientId });
      }
      if (filters.professionalId) {
        queryBuilder.andWhere('evolution.facilitatorId = :professionalId', { professionalId: filters.professionalId });
      }
      if (filters.month) {
        queryBuilder.andWhere('evolution.month = :month', { month: filters.month });
      }
      if (filters.year) {
        queryBuilder.andWhere('evolution.year = :year', { year: filters.year });
      }
    }

    const paginatedResult = await CursorPaginationHelper.paginate<EvolutionReportOrmEntity>(
      queryBuilder,
      pagination || {},
      'evolution.id',
    );

    return {
      data: paginatedResult.data.map((entity: EvolutionReportOrmEntity) => EvolutionReportMapper.toDomain(entity)),
      pageInfo: paginatedResult.pageInfo,
    };
  }

  async findById(id: string): Promise<EvolutionReport | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    if (!ormEntity) return null;
    return EvolutionReportMapper.toDomain(ormEntity);
  }

  async findByPatientId(patientId: string, filters?: EvolutionReportFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<EvolutionReport>> {
    return this.findAll({ ...filters, patientId }, pagination);
  }
}
