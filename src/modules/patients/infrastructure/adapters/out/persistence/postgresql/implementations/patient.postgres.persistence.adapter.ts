import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { Optional } from '@common/models/optional';
import { PageResult } from '@common/models/page.result';
import { ModuleEnum } from '@common/enums/module.enum';
import { DatabaseException } from '@common/exceptions/database.exception';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { Patient } from '@patients/domain/models/patient';
import { History } from '@patients/domain/models/history';
import { PatientFilters } from '@patients/domain/models/patient.filters';
import { HistoryFilters } from '@patients/domain/models/history.filters';
import { PatientNotFoundException } from '@patients/domain/exceptions/patient.not.found.exception';
import { PatientPersistencePort } from '@patients/application/ports/out/patient.persistence.port';
import { PatientTypeOrmMapper } from '../mappers/patient.type.orm.mapper';
import { HistoryTypeOrmMapper } from '../mappers/history.type.orm.mapper';
import { PatientEntity } from '../entities/patient.entity';
import { HistoryEntity } from '../entities/history.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PatientPostgresPersistenceAdapter
  implements PatientPersistencePort
{
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(DataSource)
    private readonly dataSource: DataSource,
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(HistoryEntity)
    private readonly historyRespository: Repository<HistoryEntity>,
  ) {}
  async createOnePatient(patient: Patient): Promise<Patient> {
    const patientEntity = PatientTypeOrmMapper.domainToEntity(patient);
    try {
      return await this.dataSource.transaction(async (manager) => {
        const savedEntity = await manager.save(PatientEntity, patientEntity);
        return PatientTypeOrmMapper.entityToDomain(savedEntity);
      });
    } catch {
      const exception = new DatabaseException(
        `Could not save patient with email '${patient.email}'`,
      );
      await this.createOneLogUseCase.execute(
        new Log({
          module: ModuleEnum.DATABASE,
          layer: Layer.INFRASTRUCTURE,
          level: Level.ERROR,
          message: exception.message,
        }),
      );
      throw exception;
    }
  }
  async createHistories(
    patientId: number,
    histories: History[],
  ): Promise<History[]> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const patientEntity = await manager.findOneBy(PatientEntity, {
          id: patientId,
        });
        if (!patientEntity) {
          const exception = new DatabaseException(
            `Patient with id '${patientId}' not found when trying to create histories`,
          );
          await this.createOneLogUseCase.execute(
            new Log({
              module: exception.module,
              layer: Layer.INFRASTRUCTURE,
              level: Level.FATAL,
              message: exception.message,
            }),
          );
          throw exception;
        }
        const historyEntities = histories.map((history) =>
          HistoryTypeOrmMapper.domainToEntity(history, patientEntity),
        );
        const savedHistories = await manager.save(
          HistoryEntity,
          historyEntities,
        );
        return savedHistories.map(HistoryTypeOrmMapper.entityToDomain);
      });
    } catch (error) {
      const exception = new DatabaseException(
        `Could not create histories for patientId '${patientId}'`,
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
  async findPatients(
    patientFilters: PatientFilters,
  ): Promise<PageResult<Patient>> {
    const [entities, total] = await this.patientRepository.findAndCount({
      skip: patientFilters.page.number * patientFilters.page.size,
      take: patientFilters.page.size,
      order: { id: 'ASC' },
    });
    const totalPages = Math.ceil(total / patientFilters.page.size);
    const hasNextPage = patientFilters.page.number < totalPages - 1;
    const patients = entities.map(PatientTypeOrmMapper.entityToDomain);
    return new PageResult<Patient>({
      totalItems: total,
      totalPages,
      currentPage: patientFilters.page.number,
      pageSize: patientFilters.page.size,
      hasNextPage,
      items: patients,
    });
  }
  async findOnePatient(patientId: number): Promise<Optional<Patient>> {
    const patientEntity = await this.patientRepository.findOneBy({
      id: patientId,
    });
    if (!patientEntity) {
      return Optional.empty<Patient>();
    }
    const patient = PatientTypeOrmMapper.entityToDomain(patientEntity);
    return Optional.of(patient);
  }
  async findHistories(
    historyFilters: HistoryFilters,
  ): Promise<PageResult<History>> {
    const { page, patientId } = historyFilters;
    const patientExists = await this.historyRespository.exists({
      where: { patient: { id: patientId } },
    });
    if (!patientExists) {
      const exception = new PatientNotFoundException(patientId);
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
    const total = await this.historyRespository.count({
      where: { patient: { id: patientId } },
    });
    const historyEntities = await this.historyRespository.find({
      where: { patient: { id: patientId } },
      order: { createdAt: 'DESC' },
      skip: page.number * page.size,
      take: page.size,
    });
    const totalPages = Math.ceil(total / page.size);
    const hasNextPage = page.number < totalPages - 1;
    const histories = historyEntities.map(HistoryTypeOrmMapper.entityToDomain);
    return new PageResult<History>({
      totalItems: total,
      totalPages,
      currentPage: page.number,
      pageSize: page.size,
      hasNextPage,
      items: histories,
    });
  }
  async existsOnePatientByEmail(patientEmail: string): Promise<boolean> {
    const exists = await this.patientRepository.exists({
      where: { email: patientEmail },
    });
    return exists;
  }
}
