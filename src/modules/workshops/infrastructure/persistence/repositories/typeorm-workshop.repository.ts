import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkshopRepository, WorkshopFilters } from '../../../domain/repositories/workshop.repository';
import { Workshop } from '../../../domain/entities/workshop.entity';
import { WorkshopOrmEntity } from '../entities/workshop.orm-entity';
import { WorkshopMapper } from '../../mappers/workshop.mapper';
import { CursorPaginationDto, PaginatedResult } from '../../../../../shared/domain/dtos/pagination.dto';
import { CursorPaginationHelper } from '../../../../../shared/domain/utils/cursor-pagination.helper';

@Injectable()
export class TypeOrmWorkshopRepository implements WorkshopRepository {
  constructor(
    @InjectRepository(WorkshopOrmEntity)
    private readonly ormRepository: Repository<WorkshopOrmEntity>,
  ) {}

  async save(workshop: Workshop): Promise<void> {
    const ormEntity = WorkshopMapper.toOrm(workshop);
    await this.ormRepository.save(ormEntity);
  }

  async findById(id: string): Promise<Workshop | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    if (!ormEntity) return null;
    return WorkshopMapper.toDomain(ormEntity);
  }

  async findAll(filters?: WorkshopFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<Workshop>> {
    const queryBuilder = this.ormRepository.createQueryBuilder('workshop');

    if (filters) {
      if (filters.title) {
        queryBuilder.andWhere('workshop.title ILIKE :title', { title: `%${filters.title}%` });
      }
      if (filters.status) {
        queryBuilder.andWhere('workshop.status = :status', { status: filters.status });
      }
    }

    const paginatedResult = await CursorPaginationHelper.paginate<WorkshopOrmEntity>(
      queryBuilder,
      pagination || {},
      'workshop.id',
    );

    return {
      data: paginatedResult.data.map((entity: WorkshopOrmEntity) => WorkshopMapper.toDomain(entity)),
      pageInfo: paginatedResult.pageInfo,
    };
  }
}
