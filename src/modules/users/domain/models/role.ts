export class Role {
  id: number;
  name: string;
  constructor(partial?: Partial<Role>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
