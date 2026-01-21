import { EvolutionReport } from '../../domain/entities/evolution-report.entity';
import { EvolutionReportOrmEntity } from '../persistence/entities/evolution-report.orm-entity';

export class EvolutionReportMapper {
  static toDomain(ormEntity: EvolutionReportOrmEntity): EvolutionReport {
    return new EvolutionReport(
      ormEntity.id,
      ormEntity.patientId,
      ormEntity.therapistId,
      ormEntity.month,
      ormEntity.year,
      ormEntity.learningAssessment,
      ormEntity.motorAssessment,
      ormEntity.socialAssessment,
      ormEntity.supportCharacteristics,
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }

  static toOrm(domain: EvolutionReport): EvolutionReportOrmEntity {
    const orm = new EvolutionReportOrmEntity();
    orm.id = domain.id;
    orm.patientId = domain.patientId;
    orm.therapistId = domain.therapistId;
    orm.month = domain.month;
    orm.year = domain.year;
    orm.learningAssessment = domain.learningAssessment;
    orm.motorAssessment = domain.motorAssessment;
    orm.socialAssessment = domain.socialAssessment;
    orm.supportCharacteristics = domain.supportCharacteristics;
    return orm;
  }
}
