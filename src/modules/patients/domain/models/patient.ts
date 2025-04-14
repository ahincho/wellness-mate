export class Patient {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthday: Date;
  histories: History[];
  constructor(partial?: Partial<Patient>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
