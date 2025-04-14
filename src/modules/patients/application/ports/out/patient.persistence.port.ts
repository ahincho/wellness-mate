import { Optional } from '@common/models/optional';
import { PageResult } from '@common/models/page.result';
import { Patient } from '@patients/domain/models/patient';
import { History } from '@patients/domain/models/history';
import { PatientFilters } from '@patients/domain/models/patient.filters';
import { HistoryFilters } from '@patients/domain/models/history.filters';

export interface PatientPersistencePort {
  createOnePatient(patient: Patient): Promise<Patient>;
  createHistories(patientId: number, histories: History[]): Promise<History[]>;
  findPatients(patientFilters: PatientFilters): Promise<PageResult<Patient>>;
  findOnePatient(patientId: number): Promise<Optional<Patient>>;
  findHistories(historyFilters: HistoryFilters): Promise<PageResult<History>>;
  existsOnePatientByEmail(patientEmail: string): Promise<boolean>;
}
