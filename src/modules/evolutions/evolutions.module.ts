import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvolutionReportOrmEntity } from './infrastructure/persistence/entities/evolution-report.orm-entity';
import { TypeOrmEvolutionReportRepository } from './infrastructure/persistence/repositories/typeorm-evolution-report.repository';
import { EvolutionsController } from './infrastructure/controllers/evolutions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EvolutionReportOrmEntity])],
  controllers: [EvolutionsController],
  providers: [
    {
      provide: 'EvolutionReportRepository',
      useClass: TypeOrmEvolutionReportRepository,
    },
  ],
  exports: ['EvolutionReportRepository'],
})
export class EvolutionsModule {}
