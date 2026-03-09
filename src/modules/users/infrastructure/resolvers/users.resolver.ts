import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserType } from '../../application/dtos/user.type';
import { GqlAuthGuard } from '../../../../shared/infrastructure/security/guards/gql-auth.guard';
import { CurrentUser } from '../../../../shared/infrastructure/security/decorators/current-user.decorator';
import { User } from '../../domain/entities/user.entity';

@Resolver(() => UserType)
export class UsersResolver {
  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: any) {
    // Retornamos os dados extraídos do token JWT pelo Passport
    return user;
  }
}
