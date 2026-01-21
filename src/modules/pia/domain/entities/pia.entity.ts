import * as crypto from 'crypto';

export interface PIAGoal {
  id: string;
  description: string;
  targetDate: string;
  status: 'not_started' | 'in_progress' | 'achieved';
}

export interface PIAStrategy {
  id: string;
  description: string;
  responsible: string;
}

export interface AttendanceRecord {
  date: string;
  presence: boolean;
  observations?: string;
}

export class PIA {
  constructor(
    public readonly id: string,
    public patientId: string,
    public version: number,
    public status: 'active' | 'archived',
    public goals: PIAGoal[],
    public strategies: PIAStrategy[],
    public attendanceRecords: AttendanceRecord[],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: {
    patientId: string;
    version: number;
    goals: PIAGoal[];
    strategies: PIAStrategy[];
    attendanceRecords: AttendanceRecord[];
  }): PIA {
    return new PIA(
      crypto.randomUUID(),
      props.patientId,
      props.version,
      'active',
      props.goals,
      props.strategies,
      props.attendanceRecords,
    );
  }
}
