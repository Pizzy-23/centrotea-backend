import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType('PIAFiltersInput')
export class PIAFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  status?: 'active' | 'archived';

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  version?: number;
}
