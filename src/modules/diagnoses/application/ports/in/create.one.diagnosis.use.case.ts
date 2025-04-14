import { Page } from '@common/models/page';
import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';

export interface CreateOneDiagnosisUseCase {
  execute(
    patientId: number,
    page: Page,
    chatProvider: ChatProvider,
  ): Promise<Diagnosis>;
}
