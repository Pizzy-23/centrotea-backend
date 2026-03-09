import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';

@ObjectType('Professional')
export class ProfessionalType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  specialty: string;

  @Field()
  cref: string;

  @Field(() => String)
  role: Role;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
