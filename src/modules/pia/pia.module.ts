import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PIAOrmEntity } from './infrastructure/persistence/entities/pia.orm-entity';
import { TypeOrmPIARepository } from './infrastructure/persistence/repositories/typeorm-pia.repository';
import { PIAController } from './infrastructure/controllers/pia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PIAOrmEntity])],
  controllers: [PIAController],
  providers: [
    {
      provide: 'PIARepository',
      useClass: TypeOrmPIARepository,
    },
  ],
  exports: ['PIARepository'],
})
export class PIAModule {}
