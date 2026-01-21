import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { EvolutionReportRepository, EvolutionReportFilters } from '../../domain/repositories/evolution-report.repository';
import { CursorPaginationDto } from '../../../../shared/domain/dtos/pagination.dto';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@Controller('evolutions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EvolutionsController {
  constructor(private readonly evolutionRepository: EvolutionReportRepository) {}

  @Get()
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findAll(@Query() filters: EvolutionReportFilters, @Query() pagination: CursorPaginationDto) {
    return await this.evolutionRepository.findAll(filters, pagination);
  }

  @Get('patient/:patientId')
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findByPatientId(
    @Param('patientId') patientId: string,
    @Query() filters: EvolutionReportFilters,
    @Query() pagination: CursorPaginationDto,
  ) {
    return await this.evolutionRepository.findByPatientId(patientId, filters, pagination);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findById(@Param('id') id: string) {
    return await this.evolutionRepository.findById(id);
  }
}
