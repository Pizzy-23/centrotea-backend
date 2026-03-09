import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { WorkshopType } from '../../application/dtos/workshop.type';
import { PaginatedWorkshopsType } from '../../application/dtos/paginated-workshops.type';
import { WorkshopFiltersInput } from '../../application/dtos/workshop-filters.input';
import { CursorPaginationInput } from '../../../../shared/application/dtos/graphql-pagination.input';
import { WorkshopRepository } from '../../domain/repositories/workshop.repository';
import { GqlAuthGuard } from '../../../../shared/infrastructure/security/guards/gql-auth.guard';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@Resolver(() => WorkshopType)
@UseGuards(GqlAuthGuard, RolesGuard)
export class WorkshopsResolver {
  constructor(
    @Inject('WorkshopRepository')
    private readonly workshopRepository: WorkshopRepository,
  ) {}

  @Query(() => PaginatedWorkshopsType)
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async workshops(
    @Args('filters', { nullable: true }) filters?: WorkshopFiltersInput,
    @Args('pagination', { nullable: true }) pagination?: CursorPaginationInput,
  ) {
    return await this.workshopRepository.findAll(
      filters || {},
      pagination || {},
    );
  }

  @Query(() => WorkshopType, { nullable: true })
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async workshop(@Args('id') id: string) {
    return await this.workshopRepository.findById(id);
  }
}
