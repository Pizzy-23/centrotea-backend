import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginInput } from '../../application/dtos/login.input';
import { AuthResponseType } from '../../application/dtos/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Mutation(() => AuthResponseType)
  async login(@Args('data') data: LoginInput): Promise<AuthResponseType> {
    return this.loginUseCase.execute(data);
  }
}
