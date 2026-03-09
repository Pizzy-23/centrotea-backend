import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { ProfessionalType } from '../../application/dtos/professional.type';
import { PaginatedProfessionalsType } from '../../application/dtos/paginated-professionals.type';
import { ProfessionalFiltersInput } from '../../application/dtos/professional-filters.input';
import { CursorPaginationInput } from '../../../../shared/application/dtos/graphql-pagination.input';
import { ProfessionalRepository } from '../../domain/repositories/professional.repository';
import { GqlAuthGuard } from '../../../../shared/infrastructure/security/guards/gql-auth.guard';
import { RolesGuard } from '../../../../shared/infrastructure/security/roles/roles.guard';
import { Roles } from '../../../../shared/infrastructure/security/roles/roles.decorator';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@Resolver(() => ProfessionalType)
@UseGuards(GqlAuthGuard, RolesGuard)
export class ProfessionalsResolver {
  constructor(
    @Inject('ProfessionalRepository')
    private readonly professionalRepository: ProfessionalRepository,
  ) {}

  @Query(() => PaginatedProfessionalsType)
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async professionals(
    @Args('filters', { nullable: true }) filters?: ProfessionalFiltersInput,
    @Args('pagination', { nullable: true }) pagination?: CursorPaginationInput,
  ) {
    return await this.professionalRepository.findAll(
      filters || {},
      pagination || {},
    );
  }

  @Query(() => ProfessionalType, { nullable: true })
  @Roles(Role.ADMIN, Role.THERAPIST, Role.COORDINATOR, Role.STAFF)
  async professional(@Args('id') id: string) {
    return await this.professionalRepository.findById(id);
  }
}
