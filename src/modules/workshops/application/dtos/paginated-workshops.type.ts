import { ObjectType, Field } from '@nestjs/graphql';
import { WorkshopType } from './workshop.type';
import { PageInfoType } from '../../../../shared/application/dtos/graphql-page-info.type';

@ObjectType('PaginatedWorkshops')
export class PaginatedWorkshopsType {
  @Field(() => [WorkshopType])
  data: WorkshopType[];

  @Field(() => PageInfoType)
  pageInfo: PageInfoType;
}
