import { Inject, Injectable } from '@nestjs/common';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { PATIENT_POSTGRES_REPOSITORY } from '@common/constants/patients.constants';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { Patient } from '@patients/domain/models/patient';
import { PatientNotFoundException } from '@patients/domain/exceptions/patient.not.found.exception';
import { FindOnePatientUseCase } from '../ports/in/find.one.patient.use.case';
import { PatientPersistencePort } from '../ports/out/patient.persistence.port';

@Injectable()
export class FindOnePatientDefaultService implements FindOnePatientUseCase {
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(PATIENT_POSTGRES_REPOSITORY)
    private readonly patientPersistencePort: PatientPersistencePort,
  ) {}
  async execute(patientId: number): Promise<Patient> {
    const optionalPatient =
      await this.patientPersistencePort.findOnePatient(patientId);
    if (optionalPatient.isEmpty()) {
      const exception = new PatientNotFoundException(patientId);
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
    return optionalPatient.get();
  }
}
