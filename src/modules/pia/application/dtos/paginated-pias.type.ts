import { ObjectType, Field } from '@nestjs/graphql';
import { PIAType } from './pia.type';
import { PageInfoType } from '../../../../shared/application/dtos/graphql-page-info.type';

@ObjectType('PaginatedPIAs')
export class PaginatedPIAsType {
  @Field(() => [PIAType])
  data: PIAType[];

  @Field(() => PageInfoType)
  pageInfo: PageInfoType;
}
