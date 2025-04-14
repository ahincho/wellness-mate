import { Patient } from '@patients/domain/models/patient';

export interface CreateOnePatientUseCase {
  execute(patient: Patient): Promise<Patient>;
}
