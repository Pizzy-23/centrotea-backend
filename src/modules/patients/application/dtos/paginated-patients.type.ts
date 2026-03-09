import { ObjectType, Field } from '@nestjs/graphql';
import { PatientType } from './patient.type';
import { PageInfoType } from '../../../../shared/application/dtos/graphql-page-info.type';

@ObjectType('PaginatedPatients')
export class PaginatedPatientsType {
  @Field(() => [PatientType])
  data: PatientType[];

  @Field(() => PageInfoType)
  pageInfo: PageInfoType;
}
