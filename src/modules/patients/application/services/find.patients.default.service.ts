import { Inject, Injectable } from '@nestjs/common';
import { PATIENT_POSTGRES_REPOSITORY } from '@common/constants/patients.constants';
import { PageResult } from '@common/models/page.result';
import { Patient } from '@patients/domain/models/patient';
import { PatientFilters } from '@patients/domain/models/patient.filters';
import { FindPatientsUseCase } from '../ports/in/find.patients.use.case';
import { PatientPersistencePort } from '../ports/out/patient.persistence.port';

@Injectable()
export class FindPatientsDefaultService implements FindPatientsUseCase {
  constructor(
    @Inject(PATIENT_POSTGRES_REPOSITORY)
    private readonly patientPersistencePort: PatientPersistencePort,
  ) {}
  async execute(patientFilters: PatientFilters): Promise<PageResult<Patient>> {
    return await this.patientPersistencePort.findPatients(patientFilters);
  }
}
