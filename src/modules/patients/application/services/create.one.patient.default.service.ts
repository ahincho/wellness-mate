import { Inject, Injectable } from '@nestjs/common';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { PATIENT_POSTGRES_REPOSITORY } from '@common/constants/patients.constants';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { PatientDuplicationException } from '@patients/domain/exceptions/patient.duplication.exception';
import { Patient } from '@patients/domain/models/patient';
import { CreateOnePatientUseCase } from '@patients/application/ports/in/create.one.patient.use.case';
import { PatientPersistencePort } from '@patients/application/ports/out/patient.persistence.port';

@Injectable()
export class CreateOnePatientDefaultService implements CreateOnePatientUseCase {
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(PATIENT_POSTGRES_REPOSITORY)
    private readonly patientPersistencePort: PatientPersistencePort,
  ) {}
  async execute(patient: Patient): Promise<Patient> {
    const existsByEmail =
      await this.patientPersistencePort.existsOnePatientByEmail(patient.email);
    if (existsByEmail) {
      const exception = new PatientDuplicationException('email', patient.email);
      await this.createOneLogUseCase.execute(
        new Log({
          module: exception.module,
          layer: Layer.APPLICATION,
          level: Level.WARNING,
          message: exception.message,
        }),
      );
      throw exception;
    }
    const savedPatient =
      await this.patientPersistencePort.createOnePatient(patient);
    return savedPatient;
  }
}
