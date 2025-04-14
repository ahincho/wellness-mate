import { Patient } from '@patients/domain/models/patient';
import { PatientEntity } from '../entities/patient.entity';

export class PatientTypeOrmMapper {
  static domainToEntity(patient: Patient): PatientEntity {
    return new PatientEntity({
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      birthday: patient.birthday,
    });
  }
  static entityToDomain(patientEntity: PatientEntity): Patient {
    return new Patient({
      id: patientEntity.id,
      firstname: patientEntity.firstname,
      lastname: patientEntity.lastname,
      email: patientEntity.email,
      birthday: new Date(patientEntity.birthday),
    });
  }
}
