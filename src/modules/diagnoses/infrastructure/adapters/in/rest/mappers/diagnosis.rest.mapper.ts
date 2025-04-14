import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { DiagnosisFilters } from '@diagnoses/domain/models/diagnosis.filters';
import { DiagnosisResponse } from '../dtos/diagnosis.response';
import { DiagnosisQueryRequest } from '../dtos/diagnosis.query.request';

export class DiagnosisRestMapper {
  static queryRequestToDomain(
    diagnosisQueryRequest: DiagnosisQueryRequest,
  ): DiagnosisFilters {
    return new DiagnosisFilters({
      page: {
        number: diagnosisQueryRequest.page,
        size: diagnosisQueryRequest.size,
      },
      patientId: diagnosisQueryRequest.patientId,
    });
  }
  static domainToResponse(diagnosis: Diagnosis): DiagnosisResponse {
    return new DiagnosisResponse({
      id: diagnosis.id,
      description: diagnosis.description,
      createdAt: diagnosis.createdAt,
    });
  }
}
