import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { PatientEntity } from '@patients/infrastructure/adapters/out/persistence/postgresql/entities/patient.entity';
import { DiagnosisEntity } from './diagnosis.entity';

export class DiagnosisTypeOrmMapper {
  static domainToEntity(diagnosis: Diagnosis): DiagnosisEntity {
    return new DiagnosisEntity({
      id: diagnosis.id,
      patient: { id: diagnosis.patientId } as PatientEntity,
      description: diagnosis.description,
      createdAt: diagnosis.createdAt,
    });
  }
  static entityToDomain(entity: DiagnosisEntity): Diagnosis {
    return new Diagnosis({
      id: entity.id,
      patientId: entity.patient?.id ?? null,
      description: entity.description,
      createdAt: entity.createdAt,
    });
  }
}
