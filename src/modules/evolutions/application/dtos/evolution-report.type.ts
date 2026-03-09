import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('AssessmentInfo')
export class AssessmentInfoType {
  @Field()
  status: string; // 'developing' | 'achieved' | 'not_started'

  @Field()
  observations: string;
}

@ObjectType('SupportCharacteristics')
export class SupportCharacteristicsType {
  @Field()
  physical: boolean;

  @Field()
  verbal: boolean;

  @Field()
  visual: boolean;

  @Field()
  none: boolean;

  @Field({ nullable: true })
  observations?: string;
}

@ObjectType('EvolutionReport')
export class EvolutionReportType {
  @Field()
  id: string;

  @Field()
  patientId: string;

  @Field()
  therapistId: string;

  @Field()
  month: number;

  @Field()
  year: number;

  @Field(() => AssessmentInfoType)
  learningAssessment: AssessmentInfoType;

  @Field(() => AssessmentInfoType)
  motorAssessment: AssessmentInfoType;

  @Field(() => AssessmentInfoType)
  socialAssessment: AssessmentInfoType;

  @Field(() => SupportCharacteristicsType)
  supportCharacteristics: SupportCharacteristicsType;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
