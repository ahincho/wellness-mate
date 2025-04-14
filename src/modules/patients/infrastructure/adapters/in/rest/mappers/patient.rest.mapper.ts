import { formatDate } from '@common/utils/date.utils';
import { Patient } from '@patients/domain/models/patient';
import { PatientCreateRequest } from '../dtos/patient.create.request';
import { PatientResponse } from '../dtos/patient.response';
import { PatientQueryRequest } from '../dtos/patient.query.request';
import { PatientFilters } from '@patients/domain/models/patient.filters';

export class PatientRestMapper {
  static createRequestToDomain(
    patientCreateRequest: PatientCreateRequest,
  ): Patient {
    return new Patient({
      firstname: patientCreateRequest.firstname,
      lastname: patientCreateRequest.lastname,
      email: patientCreateRequest.email,
      birthday: patientCreateRequest.birthday,
    });
  }
  static queryRequestToDomain(
    patientQueryRequest: PatientQueryRequest,
  ): PatientFilters {
    return new PatientFilters({
      page: {
        number: patientQueryRequest.page,
        size: patientQueryRequest.size,
      },
    });
  }
  static domainToResponse(patient: Patient): PatientResponse {
    return new PatientResponse({
      id: patient.id,
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      birthday: formatDate(patient.birthday),
    });
  }
}
