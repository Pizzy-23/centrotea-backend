import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from '../../../users/application/dtos/user.type';

@ObjectType('AuthResponse')
export class AuthResponseType {
  @Field()
  access_token: string;

  @Field(() => UserType)
  user: UserType;

  @Field()
  message: string;
}
