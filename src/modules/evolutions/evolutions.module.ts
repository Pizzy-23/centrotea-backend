import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvolutionReportOrmEntity } from './infrastructure/persistence/entities/evolution-report.orm-entity';
import { TypeOrmEvolutionReportRepository } from './infrastructure/persistence/repositories/typeorm-evolution-report.repository';
import { EvolutionsController } from './infrastructure/controllers/evolutions.controller';

import { EvolutionsResolver } from './infrastructure/resolvers/evolutions.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([EvolutionReportOrmEntity])],
  controllers: [EvolutionsController],
  providers: [
    {
      provide: 'EvolutionReportRepository',
      useClass: TypeOrmEvolutionReportRepository,
    },
    EvolutionsResolver,
  ],
  exports: ['EvolutionReportRepository'],
})
export class EvolutionsModule {}
