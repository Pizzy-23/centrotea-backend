import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../persistence/entities/user.orm-entity';

export class UserMapper {
  static toDomain(ormEntity: UserOrmEntity): User {
    return new User(
      ormEntity.id,
      ormEntity.name,
      ormEntity.email,
      ormEntity.passwordHash,
      ormEntity.role,
      ormEntity.avatarUrl ?? undefined,
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }

  static toOrm(domain: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.email = domain.email;
    orm.passwordHash = domain.passwordHash;
    orm.role = domain.role;
    orm.avatarUrl = domain.avatarUrl ?? null;
    return orm;
  }
}
