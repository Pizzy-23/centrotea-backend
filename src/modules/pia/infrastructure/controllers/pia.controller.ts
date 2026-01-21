import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PIARepository, PIAFilters } from '../../domain/repositories/pia.repository';
import { CursorPaginationDto } from '../../../../shared/domain/dtos/pagination.dto';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@Controller('pia')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PIAController {
  constructor(private readonly piaRepository: PIARepository) {}

  @Get()
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findAll(@Query() filters: PIAFilters, @Query() pagination: CursorPaginationDto) {
    return await this.piaRepository.findAll(filters, pagination);
  }

  @Get('patient/:patientId')
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findByPatientId(
    @Param('patientId') patientId: string,
    @Query() filters: PIAFilters,
    @Query() pagination: CursorPaginationDto,
  ) {
    return await this.piaRepository.findByPatientId(patientId, filters, pagination);
  }

  @Get('patient/:patientId/active')
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findActiveByPatientId(@Param('patientId') patientId: string) {
    return await this.piaRepository.findActiveByPatientId(patientId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findById(@Param('id') id: string) {
    return await this.piaRepository.findById(id);
  }
}
