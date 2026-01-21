import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PIAGoal, PIAStrategy, AttendanceRecord } from '../../../domain/entities/pia.entity';

@Entity('pias')
export class PIAOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'patient_id' })
  patientId: string;

  @Column('int')
  version: number;

  @Column({
    type: 'enum',
    enum: ['active', 'archived'],
    default: 'active',
  })
  status: 'active' | 'archived';

  @Column('jsonb')
  goals: PIAGoal[];

  @Column('jsonb')
  strategies: PIAStrategy[];

  @Column('jsonb', { name: 'attendance_records' })
  attendanceRecords: AttendanceRecord[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
