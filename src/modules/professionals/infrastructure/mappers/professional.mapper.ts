import { Professional } from '../../domain/entities/professional.entity';
import { ProfessionalOrmEntity } from '../persistence/entities/professional.orm-entity';

export class ProfessionalMapper {
  static toDomain(ormEntity: ProfessionalOrmEntity): Professional {
    return new Professional(
      ormEntity.id,
      ormEntity.name,
      ormEntity.email,
      ormEntity.phone,
      ormEntity.specialty,
      ormEntity.cref,
      ormEntity.role,
      ormEntity.userId ?? undefined,
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }

  static toOrm(domain: Professional): ProfessionalOrmEntity {
    const orm = new ProfessionalOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.email = domain.email;
    orm.phone = domain.phone;
    orm.specialty = domain.specialty;
    orm.cref = domain.cref;
    orm.role = domain.role;
    orm.userId = domain.userId ?? null;
    return orm;
  }
}
