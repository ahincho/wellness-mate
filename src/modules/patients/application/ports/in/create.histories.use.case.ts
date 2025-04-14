import { History } from '@patients/domain/models/history';

export interface CreateHistoriesUseCase {
  execute(patientId: number, histories: History[]): Promise<History[]>;
}
