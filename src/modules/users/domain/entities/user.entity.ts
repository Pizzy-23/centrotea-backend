import { Role } from '../../../../shared/infrastructure/security/roles/role.enum';
import * as crypto from 'crypto';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public passwordHash: string,
    public role: Role,
    public avatarUrl?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: {
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
    avatarUrl?: string;
  }): User {
    return new User(
      crypto.randomUUID(),
      props.name,
      props.email,
      props.passwordHash,
      props.role,
      props.avatarUrl,
    );
  }
}
