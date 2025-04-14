import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { Optional } from '@common/models/optional';
import { PageResult } from '@common/models/page.result';
import { DatabaseException } from '@common/exceptions/database.exception';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { DiagnosisFilters } from '@diagnoses/domain/models/diagnosis.filters';
import { DiagnosisPersistencePort } from '@diagnoses/application/ports/out/diagnosis.peristence.port';
import { DiagnosisEntity } from './diagnosis.entity';
import { DiagnosisTypeOrmMapper } from './diagnosis.type.orm.mapper';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DiagnosisPostgresPersistenceAdapter
  implements DiagnosisPersistencePort
{
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(DataSource)
    private readonly dataSource: DataSource,
    @InjectRepository(DiagnosisEntity)
    private readonly diagnosisRepository: Repository<DiagnosisEntity>,
  ) {}
  async createOneDiagnosis(diagnosis: Diagnosis): Promise<Diagnosis> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const diagnosisEntity =
          DiagnosisTypeOrmMapper.domainToEntity(diagnosis);
        const savedDiagnosis = await manager.save(
          DiagnosisEntity,
          diagnosisEntity,
        );
        return DiagnosisTypeOrmMapper.entityToDomain(savedDiagnosis);
      });
    } catch (error) {
      const exception = new DatabaseException(
        `Could not save diagnosis for patient with id '${diagnosis.patientId}'`,
      );
      await this.createOneLogUseCase.execute(
        new Log({
          module: exception.module,
          layer: Layer.INFRASTRUCTURE,
          level: Level.ERROR,
          message: exception.message,
        }),
      );
      throw exception;
    }
  }
  async findDiagnoses(
    diagnosisFilters: DiagnosisFilters,
  ): Promise<PageResult<Diagnosis>> {
    const total = await this.diagnosisRepository.count({
      where: { patient: { id: diagnosisFilters.patientId } },
    });
    const diagnosisEntities = await this.diagnosisRepository.find({
      where: { patient: { id: diagnosisFilters.patientId } },
      order: { createdAt: 'DESC' },
      skip: diagnosisFilters.page.number * diagnosisFilters.page.size,
      take: diagnosisFilters.page.size,
    });
    const totalPages = Math.ceil(total / diagnosisFilters.page.size);
    const hasNextPage = diagnosisFilters.page.number < totalPages - 1;
    const diagnoses = diagnosisEntities.map(
      DiagnosisTypeOrmMapper.entityToDomain,
    );
    return new PageResult<Diagnosis>({
      totalItems: total,
      totalPages,
      currentPage: diagnosisFilters.page.number,
      pageSize: diagnosisFilters.page.size,
      hasNextPage,
      items: diagnoses,
    });
  }
  async findOneDiagnosis(diagnosisId: number): Promise<Optional<Diagnosis>> {
    const diagnosisEntity = await this.diagnosisRepository.findOneBy({
      id: diagnosisId,
    });
    if (!diagnosisEntity) {
      return Optional.empty<Diagnosis>();
    }
    const diagnosis = DiagnosisTypeOrmMapper.entityToDomain(diagnosisEntity);
    return Optional.of(diagnosis);
  }
}
