import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientRepository, PatientFilters } from '../../../../domain/repositories/patient.repository';
import { Patient } from '../../../../domain/entities/patient.entity';
import { PatientOrmEntity } from '../entities/patient.orm-entity';
import { PatientMapper } from '../mappers/patient.mapper';
import { CursorPaginationDto, PaginatedResult } from '../../../../../../shared/domain/dtos/pagination.dto';
import { CursorPaginationHelper } from '../../../../../../shared/domain/utils/cursor-pagination.helper';

@Injectable()
export class TypeOrmPatientRepository implements PatientRepository {
  constructor(
    @InjectRepository(PatientOrmEntity)
    private readonly ormRepository: Repository<PatientOrmEntity>,
    private readonly mapper: PatientMapper,
  ) {}

  async save(patient: Patient): Promise<Patient> {
    const ormEntity = this.mapper.toOrm(patient);
    const savedEntity = await this.ormRepository.save(ormEntity);
    return this.mapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<Patient | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    if (!ormEntity) return null;
    return this.mapper.toDomain(ormEntity);
  }

  async findByRa(ra: string | number): Promise<Patient | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { ra: String(ra) } });
    if (!ormEntity) return null;
    return this.mapper.toDomain(ormEntity);
  }

  async findAll(filters?: PatientFilters, pagination?: CursorPaginationDto): Promise<PaginatedResult<Patient>> {
    const queryBuilder = this.ormRepository.createQueryBuilder('patient');

    if (filters) {
      if (filters.name) {
        queryBuilder.andWhere('patient.name ILIKE :name', { name: `%${filters.name}%` });
      }
      if (filters.ra) {
        queryBuilder.andWhere('patient.ra = :ra', { ra: String(filters.ra) });
      }
      if (filters.status) {
        queryBuilder.andWhere('patient.status = :status', { status: filters.status });
      }
      if (filters.protocol) {
        queryBuilder.andWhere('patient.protocol ILIKE :protocol', { protocol: `%${filters.protocol}%` });
      }
    }

    const paginatedResult = await CursorPaginationHelper.paginate<PatientOrmEntity>(
      queryBuilder,
      pagination || {},
      'patient.id',
    );

    return {
      data: paginatedResult.data.map((entity) => this.mapper.toDomain(entity)),
      pageInfo: paginatedResult.pageInfo,
    };
  }
}
