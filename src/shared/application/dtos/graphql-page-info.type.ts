import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('PageInfo')
export class PageInfoType {
  @Field()
  hasNextPage: boolean;

  @Field({ nullable: true })
  endCursor?: string;
}
