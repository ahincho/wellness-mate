export class UserResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  roles: string[];
  constructor(partial?: Partial<UserResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
