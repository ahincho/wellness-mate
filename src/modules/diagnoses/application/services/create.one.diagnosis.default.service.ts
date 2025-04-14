import { Inject, Injectable } from '@nestjs/common';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { FIND_HISTORIES_DEFAULT_SERVICE } from '@common/constants/patients.constants';
import { SEND_CHAT_REQUEST_DEFAULT_SERVICE } from '@common/constants/ai.constants';
import { DIAGNOSIS_POSTGRES_REPOSITORY } from '@common/constants/diagnoses.constants';
import { Page } from '@common/models/page';
import { ModuleEnum } from '@common/enums/module.enum';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { SendChatRequestUseCase } from '@shared/ai/application/ports/in/send.chat.request.use.case';
import { HistoryFilters } from '@patients/domain/models/history.filters';
import { FindHistoriesUseCase } from '@patients/application/ports/in/find.histories.use.case';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { HistoriesNotFoundException } from '@diagnoses/domain/exceptions/histories.not.found.exception';
import { CreateOneDiagnosisUseCase } from '../ports/in/create.one.diagnosis.use.case';
import { DiagnosisPersistencePort } from '../ports/out/diagnosis.peristence.port';
import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';

@Injectable()
export class CreateOneDiagnosisDefaultService
  implements CreateOneDiagnosisUseCase
{
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(FIND_HISTORIES_DEFAULT_SERVICE)
    private readonly findHistoriesUseCase: FindHistoriesUseCase,
    @Inject(SEND_CHAT_REQUEST_DEFAULT_SERVICE)
    private readonly sendChatRequestUseCase: SendChatRequestUseCase,
    @Inject(DIAGNOSIS_POSTGRES_REPOSITORY)
    private readonly diagnosisPersistencePort: DiagnosisPersistencePort,
  ) {}
  async execute(
    patientId: number,
    page: Page,
    chatProvider: ChatProvider,
  ): Promise<Diagnosis> {
    const histories = await this.findHistoriesUseCase.execute(
      new HistoryFilters({ page: page, patientId }),
    );
    if (!histories) {
      const exception = new HistoriesNotFoundException(patientId);
      await this.createOneLogUseCase.execute(
        new Log({
          module: exception.module,
          layer: Layer.APPLICATION,
          level: Level.ERROR,
          message: exception.message,
        }),
      );
      throw exception;
    }
    const chatResponse = await this.sendChatRequestUseCase.execute(
      new ChatRequest({
        provider: chatProvider,
        profile:
          'Eres un médico general experto, el usuario te brindará algunas historias médicas recientes y sobre ello debes darle consejos de cómo cuidar su salud y prevenir nuevamente sus patologías pasadas',
        prompt: `Hola, estas son mis historias médicas más recientes: ${histories.items.map((h) => h.description).join(', ')}`,
        maxTokens: 1024,
      }),
    );
    await this.createOneLogUseCase.execute(
      new Log({
        module: ModuleEnum.DIAGNOSIS,
        layer: Layer.APPLICATION,
        level: Level.INFO,
        message: `[${chatResponse.provider}-${chatResponse.model}] Analysis for patient with id '${patientId}', using ${chatResponse.totalTokens} tokens to generate recommendations based on ${histories.items.length} recent medical histories`,
      }),
    );
    const diagnosis = await this.diagnosisPersistencePort.createOneDiagnosis(
      new Diagnosis({
        patientId: patientId,
        description: chatResponse.content,
      }),
    );
    return diagnosis;
  }
}
