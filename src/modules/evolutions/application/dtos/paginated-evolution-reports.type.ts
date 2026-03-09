import { ObjectType, Field } from '@nestjs/graphql';
import { EvolutionReportType } from './evolution-report.type';
import { PageInfoType } from '../../../../shared/application/dtos/graphql-page-info.type';

@ObjectType('PaginatedEvolutionReports')
export class PaginatedEvolutionReportsType {
  @Field(() => [EvolutionReportType])
  data: EvolutionReportType[];

  @Field(() => PageInfoType)
  pageInfo: PageInfoType;
}
