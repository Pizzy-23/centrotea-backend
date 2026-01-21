import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { WorkshopRepository, WorkshopFilters } from '../../domain/repositories/workshop.repository';
import { CursorPaginationDto } from '../../../../shared/domain/dtos/pagination.dto';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@Controller('workshops')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkshopsController {
  constructor(private readonly workshopRepository: WorkshopRepository) {}

  @Get()
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findAll(@Query() filters: WorkshopFilters, @Query() pagination: CursorPaginationDto) {
    return await this.workshopRepository.findAll(filters, pagination);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findById(@Param('id') id: string) {
    return await this.workshopRepository.findById(id);
  }
}
