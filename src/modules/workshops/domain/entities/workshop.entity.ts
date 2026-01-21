import * as crypto from 'crypto';

export interface WorkshopClass {
  id: string;
  name: string; // Ex: Turma A, Manhã, etc.
  facilitatorIds: string[];
  patientIds: string[];
  schedule: {
    dayOfWeek: number; // 0-6
    startTime: string;
    endTime: string;
  }[];
}

export class Workshop {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public classes: WorkshopClass[],
    public status: 'active' | 'inactive',
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: {
    title: string;
    description: string;
    classes: WorkshopClass[];
  }): Workshop {
    return new Workshop(
      crypto.randomUUID(),
      props.title,
      props.description,
      props.classes,
      'active',
    );
  }
}
