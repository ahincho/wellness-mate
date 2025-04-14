import { History } from '@patients/domain/models/history';
import { HistoryEntity } from '../entities/history.entity';
import { PatientEntity } from '../entities/patient.entity';

export class HistoryTypeOrmMapper {
  static domainToEntity(
    history: History,
    patientEntity: PatientEntity,
  ): HistoryEntity {
    return new HistoryEntity({
      patient: patientEntity,
      description: history.description,
      createdAt: history.createdAt,
    });
  }
  static entityToDomain(entity: HistoryEntity): History {
    return new History({
      id: entity.id,
      description: entity.description,
      createdAt: entity.createdAt,
    });
  }
}
