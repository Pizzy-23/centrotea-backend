import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PatientStatus } from '../../domain/entities/patient.entity';

@InputType('PatientFiltersInput')
export class PatientFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ra?: string;

  @Field(() => PatientStatus, { nullable: true })
  @IsOptional()
  @IsEnum(PatientStatus)
  status?: PatientStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  protocol?: string;
}
