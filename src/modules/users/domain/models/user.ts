import { Role } from './role';

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roles: Role[];
  constructor(partial?: Partial<User>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
