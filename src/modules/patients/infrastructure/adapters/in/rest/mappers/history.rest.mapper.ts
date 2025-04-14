import { History } from '@patients/domain/models/history';
import { HistoryFilters } from '@patients/domain/models/history.filters';
import { HistoryCreateRequest } from '../dtos/history.create.request';
import { PatientHistoryQueryRequest } from '../dtos/patient.history.query.request';
import { HistoryResponse } from '../dtos/history.response';

export class HistoryRestMapper {
  static createRequestToDomain(
    historyCreateRequest: HistoryCreateRequest,
  ): History {
    return new History({ description: historyCreateRequest.description });
  }
  static queryRequestToDomain(
    patientId: number,
    patientHistoryQueryRequest: PatientHistoryQueryRequest,
  ): HistoryFilters {
    return new HistoryFilters({
      page: {
        number: patientHistoryQueryRequest.page,
        size: patientHistoryQueryRequest.size,
      },
      patientId: patientId,
    });
  }
  static domainToResponse(history: History): HistoryResponse {
    return new HistoryResponse({
      id: history.id,
      description: history.description,
      createdAt: history.createdAt,
    });
  }
}
