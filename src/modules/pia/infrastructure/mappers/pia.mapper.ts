import { PIA } from '../../domain/entities/pia.entity';
import { PIAOrmEntity } from '../persistence/entities/pia.orm-entity';

export class PIAMapper {
  static toDomain(ormEntity: PIAOrmEntity): PIA {
    return new PIA(
      ormEntity.id,
      ormEntity.patientId,
      ormEntity.version,
      ormEntity.status,
      ormEntity.goals,
      ormEntity.strategies,
      ormEntity.attendanceRecords,
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }

  static toOrm(domain: PIA): PIAOrmEntity {
    const orm = new PIAOrmEntity();
    orm.id = domain.id;
    orm.patientId = domain.patientId;
    orm.version = domain.version;
    orm.status = domain.status;
    orm.goals = domain.goals;
    orm.strategies = domain.strategies;
    orm.attendanceRecords = domain.attendanceRecords;
    return orm;
  }
}
