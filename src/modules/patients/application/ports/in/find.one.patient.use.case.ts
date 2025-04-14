import { Patient } from '@patients/domain/models/patient';

export interface FindOnePatientUseCase {
  execute(patientId: number): Promise<Patient>;
}
