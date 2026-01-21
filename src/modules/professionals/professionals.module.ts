import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalOrmEntity } from './infrastructure/persistence/entities/professional.orm-entity';
import { TypeOrmProfessionalRepository } from './infrastructure/persistence/repositories/typeorm-professional.repository';

import { ProfessionalsController } from './infrastructure/controllers/professionals.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionalOrmEntity])],
  controllers: [ProfessionalsController],
  providers: [
    {
      provide: 'ProfessionalRepository',
      useClass: TypeOrmProfessionalRepository,
    },
  ],
  exports: ['ProfessionalRepository'],
})
export class ProfessionalsModule {}
