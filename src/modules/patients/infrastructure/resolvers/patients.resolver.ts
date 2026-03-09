import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CreatePatientUseCase } from '../../application/use-cases/create-patient.use-case';
import { FindAllPatientsUseCase } from '../../application/use-cases/find-all-patients.use-case';
import { PatientType } from '../../application/dtos/patient.type';
import { PaginatedPatientsType } from '../../application/dtos/paginated-patients.type';
import { CreatePatientInput } from '../../application/dtos/create-patient.input';
import { PatientFiltersInput } from '../../application/dtos/patient-filters.input';
import { CursorPaginationInput } from '../../../../shared/application/dtos/graphql-pagination.input';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { GqlAuthGuard } from '../../../../shared/infrastructure/security/guards/gql-auth.guard';

@Resolver(() => PatientType)
@UseGuards(GqlAuthGuard, RolesGuard)
export class PatientsResolver {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly findAllPatientsUseCase: FindAllPatientsUseCase,
  ) {}

  @Mutation(() => PatientType)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  async createPatient(@Args('data') data: CreatePatientInput) {
    return await this.createPatientUseCase.execute(data);
  }

  @Query(() => PaginatedPatientsType)
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async patients(
    @Args('filters', { nullable: true }) filters?: PatientFiltersInput,
    @Args('pagination', { nullable: true }) pagination?: CursorPaginationInput,
  ) {
    return await this.findAllPatientsUseCase.execute(
      filters || {},
      pagination || {},
    );
  }
}
