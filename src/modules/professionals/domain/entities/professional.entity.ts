import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';
import * as crypto from 'crypto';

export class Professional {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public phone: string,
    public specialty: string,
    public cref: string,
    public role: Role,
    public userId?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: {
    name: string;
    email: string;
    phone: string;
    specialty: string;
    cref: string;
    role: Role;
    userId?: string;
  }): Professional {
    return new Professional(
      crypto.randomUUID(),
      props.name,
      props.email,
      props.phone,
      props.specialty,
      props.cref,
      props.role,
      props.userId,
    );
  }
}
