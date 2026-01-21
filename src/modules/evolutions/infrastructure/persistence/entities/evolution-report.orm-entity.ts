import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AssessmentInfo, SupportCharacteristics } from '../../../../../modules/evolutions/domain/entities/evolution-report.entity';

@Entity('evolution_reports')
export class EvolutionReportOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'patient_id' })
  patientId: string;

  @Column({ name: 'therapist_id' })
  therapistId: string;

  @Column('int')
  month: number;

  @Column('int')
  year: number;

  @Column('jsonb', { name: 'learning_assessment' })
  learningAssessment: AssessmentInfo;

  @Column('jsonb', { name: 'motor_assessment' })
  motorAssessment: AssessmentInfo;

  @Column('jsonb', { name: 'social_assessment' })
  socialAssessment: AssessmentInfo;

  @Column('jsonb', { name: 'support_characteristics' })
  supportCharacteristics: SupportCharacteristics;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
