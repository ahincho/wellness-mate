import { Inject, Injectable } from '@nestjs/common';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { PATIENT_POSTGRES_REPOSITORY } from '@common/constants/patients.constants';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { History } from '@patients/domain/models/history';
import { PatientNotFoundException } from '@patients/domain/exceptions/patient.not.found.exception';
import { CreateHistoriesUseCase } from '../ports/in/create.histories.use.case';
import { PatientPersistencePort } from '../ports/out/patient.persistence.port';

@Injectable()
export class CreateHistoriesDefaultService implements CreateHistoriesUseCase {
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(PATIENT_POSTGRES_REPOSITORY)
    private readonly patientPersistencePort: PatientPersistencePort,
  ) {}
  async execute(patientId: number, histories: History[]): Promise<History[]> {
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
    const savedHistories = await this.patientPersistencePort.createHistories(
      patientId,
      histories,
    );
    return savedHistories;
  }
}
