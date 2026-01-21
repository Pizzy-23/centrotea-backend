import { Workshop } from '../../domain/entities/workshop.entity';
import { WorkshopOrmEntity } from '../persistence/entities/workshop.orm-entity';

export class WorkshopMapper {
  static toDomain(ormEntity: WorkshopOrmEntity): Workshop {
    return new Workshop(
      ormEntity.id,
      ormEntity.title,
      ormEntity.description,
      ormEntity.classes,
      ormEntity.status as 'active' | 'inactive',
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }

  static toOrm(domain: Workshop): WorkshopOrmEntity {
    const orm = new WorkshopOrmEntity();
    orm.id = domain.id;
    orm.title = domain.title;
    orm.description = domain.description;
    orm.classes = domain.classes;
    orm.status = domain.status;
    return orm;
  }
}
