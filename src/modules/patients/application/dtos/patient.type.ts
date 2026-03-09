import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { PatientStatus } from '../../domain/entities/patient.entity';

registerEnumType(PatientStatus, {
  name: 'PatientStatus', // Nomenclatura para o Schema
});

@ObjectType('Patient')
export class PatientType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  ra: string;

  @Field()
  age: number;

  @Field()
  birthDate: Date;

  @Field(() => PatientStatus)
  status: PatientStatus;

  @Field()
  protocol: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, any>;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
