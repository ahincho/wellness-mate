import { PageResult } from '@common/models/page.result';
import { Patient } from '@patients/domain/models/patient';
import { PatientFilters } from '@patients/domain/models/patient.filters';

export interface FindPatientsUseCase {
  execute(patientFilters: PatientFilters): Promise<PageResult<Patient>>;
}
