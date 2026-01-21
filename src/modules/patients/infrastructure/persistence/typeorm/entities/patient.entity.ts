import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('patients')
export class PatientOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  ra: number;

  @Column({ name: 'nivel_suporte', type: 'int', default: 1 })
  nivelSuporte: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ name: 'chart_type', nullable: true })
  chartType: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: string; // Salvaremos como string criptografada no banco, mas TypeORM pode mapear para jsonb

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
