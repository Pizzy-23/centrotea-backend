import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { EvolutionReportType } from '../../application/dtos/evolution-report.type';
import { PaginatedEvolutionReportsType } from '../../application/dtos/paginated-evolution-reports.type';
import { EvolutionReportFiltersInput } from '../../application/dtos/evolution-report-filters.input';
import { CursorPaginationInput } from '../../../../shared/application/dtos/graphql-pagination.input';
import { EvolutionReportRepository } from '../../domain/repositories/evolution-report.repository';
import { GqlAuthGuard } from '../../../../shared/infrastructure/security/guards/gql-auth.guard';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@Resolver(() => EvolutionReportType)
@UseGuards(GqlAuthGuard, RolesGuard)
export class EvolutionsResolver {
  constructor(
    @Inject('EvolutionReportRepository')
    private readonly evolutionRepository: EvolutionReportRepository,
  ) {}

  @Query(() => PaginatedEvolutionReportsType)
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async evolutions(
    @Args('filters', { nullable: true }) filters?: EvolutionReportFiltersInput,
    @Args('pagination', { nullable: true }) pagination?: CursorPaginationInput,
  ) {
    return await this.evolutionRepository.findAll(
      filters || {},
      pagination || {},
    );
  }

  @Query(() => PaginatedEvolutionReportsType)
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async evolutionsByPatient(
    @Args('patientId') patientId: string,
    @Args('filters', { nullable: true }) filters?: EvolutionReportFiltersInput,
    @Args('pagination', { nullable: true }) pagination?: CursorPaginationInput,
  ) {
    return await this.evolutionRepository.findByPatientId(
      patientId,
      filters || {},
      pagination || {},
    );
  }

  @Query(() => EvolutionReportType, { nullable: true })
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async evolution(@Args('id') id: string) {
    return await this.evolutionRepository.findById(id);
  }
}
