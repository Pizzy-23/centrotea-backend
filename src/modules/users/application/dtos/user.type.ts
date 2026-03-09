import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => String)
  role: Role;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
