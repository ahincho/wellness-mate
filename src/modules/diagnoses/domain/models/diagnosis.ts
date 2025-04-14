export class Diagnosis {
  id: number;
  patientId: number;
  description: string;
  createdAt: Date;
  constructor(partial?: Partial<Diagnosis>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
