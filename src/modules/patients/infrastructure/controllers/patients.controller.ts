import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { CreatePatientDto } from '../../application/dtos/create-patient.dto';
import { CreatePatientUseCase } from '../../application/use-cases/create-patient.use-case';
import { FindAllPatientsUseCase } from '../../application/use-cases/find-all-patients.use-case';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { PatientFilters } from '../../domain/repositories/patient.repository';
import { CursorPaginationDto } from '../../../../shared/domain/dtos/pagination.dto';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly findAllPatientsUseCase: FindAllPatientsUseCase,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINATOR)
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.createPatientUseCase.execute(createPatientDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async findAll(@Query() filters: PatientFilters, @Query() pagination: CursorPaginationDto) {
    return await this.findAllPatientsUseCase.execute(filters, pagination);
  }
}
