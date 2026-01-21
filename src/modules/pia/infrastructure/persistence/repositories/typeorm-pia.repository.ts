import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PIARepository, PIAFilters } from '../../../domain/repositories/pia.repository';
import { PIA } from '../../../domain/entities/pia.entity';
import { PIAOrmEntity } from '../entities/pia.orm-entity';
import { PIAMapper } from '../../mappers/pia.mapper';
import { CursorPaginationDto, PaginatedResult } from '../../../../../shared/domain/dtos/pagination.dto';
import { CursorPaginationHelper } from '../../../../../shared/domain/utils/cursor-pagination.helper';

@Injectable()
export class TypeOrmPIARepository implements PIARepository {
  constructor(
    @InjectRepository(PIAOrmEntity)
    private readonly ormRepository: Repository<PIAOrmEntity>,
  ) {}

  async save(pia: PIA): Promise<PIA> {
    const ormEntity = PIAMapper.toOrm(pia);
    const savedEntity = await this.ormRepository.save(ormEntity);
    return PIAMapper.toDomain(savedEntity);
  }

  async findAll(filters?: PIAFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<PIA>> {
    const queryBuilder = this.ormRepository.createQueryBuilder('pia');

    if (filters) {
      if (filters.patientId) {
        queryBuilder.andWhere('pia.patientId = :patientId', { patientId: filters.patientId });
      }
      if (filters.status) {
        queryBuilder.andWhere('pia.status = :status', { status: filters.status });
      }
    }

    const paginatedResult = await CursorPaginationHelper.paginate<PIAOrmEntity>(
      queryBuilder,
      pagination || {},
      'pia.id',
    );

    return {
      data: paginatedResult.data.map((entity: PIAOrmEntity) => PIAMapper.toDomain(entity)),
      pageInfo: paginatedResult.pageInfo,
    };
  }

  async findById(id: string): Promise<PIA | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    if (!ormEntity) return null;
    return PIAMapper.toDomain(ormEntity);
  }

  async findByPatientId(patientId: string, filters?: PIAFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<PIA>> {
    return this.findAll({ ...filters, patientId }, pagination);
  }

  async findActiveByPatientId(patientId: string): Promise<PIA | null> {
    const ormEntity = await this.ormRepository.findOne({ 
      where: { patientId, status: 'active' } 
    });
    if (!ormEntity) return null;
    return PIAMapper.toDomain(ormEntity);
  }
}
