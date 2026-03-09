import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CursorPaginationInput {
  @Field({ nullable: true })
  cursor?: string;

  @Field({ nullable: true, defaultValue: 10 })
  limit?: number;
}
