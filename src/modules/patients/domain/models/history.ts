import { Patient } from './patient';

export class History {
  id: number;
  patient: Patient;
  description: string;
  createdAt: Date;
  constructor(partial?: Partial<History>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
