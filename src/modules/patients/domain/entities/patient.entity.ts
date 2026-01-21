import * as crypto from 'crypto';

export enum PatientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  WAITING = 'waiting',
}

export class Patient {
  constructor(
    public readonly id: string,
    public name: string,
    public ra: string | number,
    public age: number,
    public birthDate: Date,
    public status: PatientStatus,
    public protocol: string,
    public metadata: Record<string, any>,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: {
    name: string;
    ra: string | number;
    age: number;
    birthDate: Date;
    status: PatientStatus;
    protocol: string;
    metadata: Record<string, any>;
  }): Patient {
    return new Patient(
      crypto.randomUUID(),
      props.name,
      props.ra,
      props.age,
      props.birthDate,
      props.status,
      props.protocol,
      props.metadata,
    );
  }
}
