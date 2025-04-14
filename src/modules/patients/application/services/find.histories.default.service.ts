import { Inject, Injectable } from '@nestjs/common';
import { PATIENT_POSTGRES_REPOSITORY } from '@common/constants/patients.constants';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { PageResult } from '@common/models/page.result';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { History } from '@patients/domain/models/history';
import { HistoryFilters } from '@patients/domain/models/history.filters';
import { PatientNotFoundException } from '@patients/domain/exceptions/patient.not.found.exception';
import { FindHistoriesUseCase } from '../ports/in/find.histories.use.case';
import { PatientPersistencePort } from '../ports/out/patient.persistence.port';

@Injectable()
export class FindHistoriesDefaultService implements FindHistoriesUseCase {
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(PATIENT_POSTGRES_REPOSITORY)
    private readonly patientPersistencePort: PatientPersistencePort,
  ) {}
  async execute(historyFilters: HistoryFilters): Promise<PageResult<History>> {
    const optionalPatient = await this.patientPersistencePort.findOnePatient(
      historyFilters.patientId,
    );
    if (optionalPatient.isEmpty()) {
      const exception = new PatientNotFoundException(historyFilters.patientId);
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
    return await this.patientPersistencePort.findHistories(historyFilters);
  }
}
