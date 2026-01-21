import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserOrmEntity } from '../../../../users/infrastructure/persistence/entities/user.orm-entity';
import { Role } from '../../../../../shared/infrastructure/security/roles/role.enum';

@Entity('professionals')
export class ProfessionalOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  specialty: string;

  @Column({ nullable: true })
  cref: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @OneToOne(() => UserOrmEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UserOrmEntity;

  @Column({ name: 'user_id', nullable: true })
  userId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
