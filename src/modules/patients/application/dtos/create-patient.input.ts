import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsObject,
  IsDateString,
} from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { PatientStatus } from '../../domain/entities/patient.entity';

@InputType('CreatePatientInput')
export class CreatePatientInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  ra: string; // ra is string or number in domain, but in GraphQL string is more compatible

  @Field()
  @IsNumber()
  age: number;

  @Field()
  @IsDateString()
  birthDate: string;

  @Field(() => PatientStatus, { nullable: true })
  @IsEnum(PatientStatus)
  @IsOptional()
  status?: PatientStatus;

  @Field()
  @IsString()
  @IsNotEmpty()
  protocol: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
