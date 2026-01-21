import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessionalRepository, ProfessionalFilters } from '../../../domain/repositories/professional.repository';
import { Professional } from '../../../domain/entities/professional.entity';
import { ProfessionalOrmEntity } from '../entities/professional.orm-entity';
import { ProfessionalMapper } from '../../mappers/professional.mapper';
import { CursorPaginationDto, PaginatedResult } from '../../../../../shared/domain/dtos/pagination.dto';
import { CursorPaginationHelper } from '../../../../../shared/domain/utils/cursor-pagination.helper';

@Injectable()
export class TypeOrmProfessionalRepository implements ProfessionalRepository {
  constructor(
    @InjectRepository(ProfessionalOrmEntity)
    private readonly ormRepository: Repository<ProfessionalOrmEntity>,
  ) {}

  async save(professional: Professional): Promise<Professional> {
    const ormEntity = ProfessionalMapper.toOrm(professional);
    const savedEntity = await this.ormRepository.save(ormEntity);
    return ProfessionalMapper.toDomain(savedEntity);
  }

  async findAll(filters?: ProfessionalFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<Professional>> {
    const queryBuilder = this.ormRepository.createQueryBuilder('professional');

    if (filters) {
      if (filters.name) {
        queryBuilder.andWhere('professional.name ILIKE :name', { name: `%${filters.name}%` });
      }
      if (filters.email) {
        queryBuilder.andWhere('professional.email ILIKE :email', { email: `%${filters.email}%` });
      }
      if (filters.specialty) {
        queryBuilder.andWhere('professional.specialty ILIKE :specialty', { specialty: `%${filters.specialty}%` });
      }
    }

    const paginatedResult = await CursorPaginationHelper.paginate<ProfessionalOrmEntity>(
      queryBuilder,
      pagination || {},
      'professional.id',
    );

    return {
      data: paginatedResult.data.map((entity: ProfessionalOrmEntity) => ProfessionalMapper.toDomain(entity)),
      pageInfo: paginatedResult.pageInfo,
    };
  }

  async findById(id: string): Promise<Professional | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    if (!ormEntity) return null;
    return ProfessionalMapper.toDomain(ormEntity);
  }

  async findByUserId(userId: string): Promise<Professional | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { userId } });
    if (!ormEntity) return null;
    return ProfessionalMapper.toDomain(ormEntity);
  }
}
