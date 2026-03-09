import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('PIAGoal')
export class PIAGoalType {
  @Field()
  id: string;

  @Field()
  description: string;

  @Field()
  targetDate: string;

  @Field()
  status: string; // 'not_started' | 'in_progress' | 'achieved'
}

@ObjectType('PIAStrategy')
export class PIAStrategyType {
  @Field()
  id: string;

  @Field()
  description: string;

  @Field()
  responsible: string;
}

@ObjectType('AttendanceRecord')
export class AttendanceRecordType {
  @Field()
  date: string;

  @Field()
  presence: boolean;

  @Field({ nullable: true })
  observations?: string;
}

@ObjectType('PIA')
export class PIAType {
  @Field()
  id: string;

  @Field()
  patientId: string;

  @Field(() => Int)
  version: number;

  @Field()
  status: string; // 'active' | 'archived'

  @Field(() => [PIAGoalType])
  goals: PIAGoalType[];

  @Field(() => [PIAStrategyType])
  strategies: PIAStrategyType[];

  @Field(() => [AttendanceRecordType])
  attendanceRecords: AttendanceRecordType[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
