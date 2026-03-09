import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber } from 'class-validator';

@InputType('EvolutionReportFiltersInput')
export class EvolutionReportFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  patientId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  professionalId?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  month?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  year?: number;
}
