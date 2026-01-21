import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkshopOrmEntity } from './infrastructure/persistence/entities/workshop.orm-entity';
import { TypeOrmWorkshopRepository } from './infrastructure/persistence/repositories/typeorm-workshop.repository';

import { WorkshopsController } from './infrastructure/controllers/workshops.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkshopOrmEntity])],
  controllers: [WorkshopsController],
  providers: [
    {
      provide: 'WorkshopRepository',
      useClass: TypeOrmWorkshopRepository,
    },
  ],
  exports: ['WorkshopRepository'],
})
export class WorkshopsModule {}
