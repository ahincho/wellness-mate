export class PatientResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthday: string;
  constructor(partial?: Partial<PatientResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
