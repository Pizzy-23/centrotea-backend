import { ObjectType, Field } from '@nestjs/graphql';
import { ProfessionalType } from './professional.type';
import { PageInfoType } from '../../../../shared/application/dtos/graphql-page-info.type';

@ObjectType('PaginatedProfessionals')
export class PaginatedProfessionalsType {
  @Field(() => [ProfessionalType])
  data: ProfessionalType[];

  @Field(() => PageInfoType)
  pageInfo: PageInfoType;
}
