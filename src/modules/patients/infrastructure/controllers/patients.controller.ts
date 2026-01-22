import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CreatePatientDto } from '../../application/dtos/create-patient.dto';
import { CreatePatientUseCase } from '../../application/use-cases/create-patient.use-case';
import { FindAllPatientsUseCase } from '../../application/use-cases/find-all-patients.use-case';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { PatientFilters } from '../../domain/repositories/patient.repository';
import { CursorPaginationDto } from '../../../../shared/domain/dtos/pagination.dto';
import {
  SWAGGER_DOCS,
  swaggerSuccess,
  swaggerError,
} from '../../../../shared/domain/constants';

@ApiTags(SWAGGER_DOCS.TAGS.PATIENTS)
@ApiBearerAuth()
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly findAllPatientsUseCase: FindAllPatientsUseCase,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiOperation({ summary: SWAGGER_DOCS.DESCRIPTIONS.PATIENTS.CREATE })
  @ApiResponse(swaggerSuccess(201))
  @ApiResponse(swaggerError('Paciente')[409])
  @ApiResponse(swaggerError('Paciente')[401])
  @ApiResponse(swaggerError('Paciente')[403])
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.createPatientUseCase.execute(createPatientDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  @ApiOperation({ summary: SWAGGER_DOCS.DESCRIPTIONS.PATIENTS.FIND_ALL })
  @ApiQuery({
    name: 'name',
    required: false,
    description: SWAGGER_DOCS.QUERIES.NAME,
  })
  @ApiQuery({
    name: 'ra',
    required: false,
    description: SWAGGER_DOCS.QUERIES.RA,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: SWAGGER_DOCS.QUERIES.STATUS,
  })
  @ApiQuery({
    name: 'protocol',
    required: false,
    description: SWAGGER_DOCS.QUERIES.PROTOCOL,
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    description: SWAGGER_DOCS.QUERIES.CURSOR,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: SWAGGER_DOCS.QUERIES.LIMIT,
    type: Number,
  })
  @ApiResponse(swaggerSuccess(200))
  @ApiResponse(swaggerError('Paciente')[401])
  @ApiResponse(swaggerError('Paciente')[403])
  async findAll(
    @Query() filters: PatientFilters,
    @Query() pagination: CursorPaginationDto,
  ) {
    return await this.findAllPatientsUseCase.execute(filters, pagination);
  }
}
