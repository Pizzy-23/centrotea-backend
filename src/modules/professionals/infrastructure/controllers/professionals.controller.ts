import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ProfessionalRepository, ProfessionalFilters } from '../../domain/repositories/professional.repository';
import { CursorPaginationDto } from '../../../../shared/domain/dtos/pagination.dto';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@Controller('professionals')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfessionalsController {
  constructor(private readonly professionalRepository: ProfessionalRepository) {}

  @Get()
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findAll(@Query() filters: ProfessionalFilters, @Query() pagination: CursorPaginationDto) {
    return await this.professionalRepository.findAll(filters, pagination);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findById(@Param('id') id: string) {
    return await this.professionalRepository.findById(id);
  }
}
