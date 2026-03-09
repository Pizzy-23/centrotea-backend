import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { PIAType } from '../../application/dtos/pia.type';
import { PaginatedPIAsType } from '../../application/dtos/paginated-pias.type';
import { PIAFiltersInput } from '../../application/dtos/pia-filters.input';
import { CursorPaginationInput } from '../../../../shared/application/dtos/graphql-pagination.input';
import { PIARepository } from '../../domain/repositories/pia.repository';
import { GqlAuthGuard } from '../../../../shared/infrastructure/security/guards/gql-auth.guard';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@Resolver(() => PIAType)
@UseGuards(GqlAuthGuard, RolesGuard)
export class PIAResolver {
  constructor(
    @Inject('PIARepository')
    private readonly piaRepository: PIARepository,
  ) {}

  @Query(() => PaginatedPIAsType)
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async pias(
    @Args('filters', { nullable: true }) filters?: PIAFiltersInput,
    @Args('pagination', { nullable: true }) pagination?: CursorPaginationInput,
  ) {
    return await this.piaRepository.findAll(filters || {}, pagination || {});
  }

  @Query(() => PaginatedPIAsType)
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async piasByPatient(
    @Args('patientId') patientId: string,
    @Args('filters', { nullable: true }) filters?: PIAFiltersInput,
    @Args('pagination', { nullable: true }) pagination?: CursorPaginationInput,
  ) {
    return await this.piaRepository.findByPatientId(
      patientId,
      filters || {},
      pagination || {},
    );
  }

  @Query(() => PIAType, { nullable: true })
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async activePiaByPatient(@Args('patientId') patientId: string) {
    return await this.piaRepository.findActiveByPatientId(patientId);
  }

  @Query(() => PIAType, { nullable: true })
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async pia(@Args('id') id: string) {
    return await this.piaRepository.findById(id);
  }
}
