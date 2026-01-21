import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<void> {
    const ormEntity = UserMapper.toOrm(user);
    await this.repository.save(ormEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormEntity = await this.repository.findOneBy({ email });
    return ormEntity ? UserMapper.toDomain(ormEntity) : null;
  }

  async findById(id: string): Promise<User | null> {
    const ormEntity = await this.repository.findOneBy({ id });
    return ormEntity ? UserMapper.toDomain(ormEntity) : null;
  }
}
