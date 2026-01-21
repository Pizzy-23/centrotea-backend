import * as crypto from 'crypto';

export interface AssessmentInfo {
  status: 'developing' | 'achieved' | 'not_started';
  observations: string;
}

export interface SupportCharacteristics {
  physical: boolean;
  verbal: boolean;
  visual: boolean;
  none: boolean;
  observations?: string;
}

export class EvolutionReport {
  constructor(
    public readonly id: string,
    public patientId: string,
    public therapistId: string,
    public month: number,
    public year: number,
    public learningAssessment: AssessmentInfo,
    public motorAssessment: AssessmentInfo,
    public socialAssessment: AssessmentInfo,
    public supportCharacteristics: SupportCharacteristics,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: {
    patientId: string;
    therapistId: string;
    month: number;
    year: number;
    learningAssessment: AssessmentInfo;
    motorAssessment: AssessmentInfo;
    socialAssessment: AssessmentInfo;
    supportCharacteristics: SupportCharacteristics;
  }): EvolutionReport {
    return new EvolutionReport(
      crypto.randomUUID(),
      props.patientId,
      props.therapistId,
      props.month,
      props.year,
      props.learningAssessment,
      props.motorAssessment,
      props.socialAssessment,
      props.supportCharacteristics,
    );
  }
}
