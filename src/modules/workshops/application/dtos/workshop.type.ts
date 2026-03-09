import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('WorkshopSchedule')
export class WorkshopScheduleType {
  @Field(() => Int)
  dayOfWeek: number;

  @Field()
  startTime: string;

  @Field()
  endTime: string;
}

@ObjectType('WorkshopClass')
export class WorkshopClassType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [String])
  facilitatorIds: string[];

  @Field(() => [String])
  patientIds: string[];

  @Field(() => [WorkshopScheduleType])
  schedule: WorkshopScheduleType[];
}

@ObjectType('Workshop')
export class WorkshopType {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [WorkshopClassType])
  classes: WorkshopClassType[];

  @Field()
  status: string; // 'active' | 'inactive'

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
