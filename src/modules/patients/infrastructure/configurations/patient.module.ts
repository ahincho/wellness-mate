import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CREATE_HISTORIES_DEFAULT_SERVICE,
  CREATE_ONE_PATIENT_DEFAULT_SERVICE,
  FIND_HISTORIES_DEFAULT_SERVICE,
  FIND_ONE_PATIENT_DEFAULT_SERVICE,
  FIND_PATIENTS_DEFAULT_SERVICE,
  PATIENT_POSTGRES_REPOSITORY,
} from '@common/constants/patients.constants';
import { LoggingModule } from '@shared/logging/infrastructure/configurations/logging.module';
import { CreateOnePatientDefaultService } from '@patients/application/services/create.one.patient.default.service';
import { CreateHistoriesDefaultService } from '@patients/application/services/create.histories.default.service';
import { FindPatientsDefaultService } from '@patients/application/services/find.patients.default.service';
import { FindOnePatientDefaultService } from '@patients/application/services/find.one.patient.default.service';
import { FindHistoriesDefaultService } from '@patients/application/services/find.histories.default.service';
import { CreateOnePatientRestController } from '../adapters/in/rest/controllers/create.one.patient.rest.controller';
import { CreateHistoriesRestController } from '../adapters/in/rest/controllers/create.histories.rest.controller';
import { FindPatientsRestController } from '../adapters/in/rest/controllers/find.patients.rest.controller';
import { FindOnePatientRestController } from '../adapters/in/rest/controllers/find.one.patient.rest.controller';
import { FindHistoriesRestController } from '../adapters/in/rest/controllers/find.histories.rest.controller';
import { PatientHttpExceptionFilter } from '../adapters/in/rest/filters/patient.http.exception.filter';
import { PatientPostgresPersistenceAdapter } from '../adapters/out/persistence/postgresql/implementations/patient.postgres.persistence.adapter';
import { PatientEntity } from '../adapters/out/persistence/postgresql/entities/patient.entity';
import { HistoryEntity } from '../adapters/out/persistence/postgresql/entities/history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientEntity, HistoryEntity]),
    LoggingModule,
  ],
  providers: [
    {
      provide: CREATE_ONE_PATIENT_DEFAULT_SERVICE,
      useClass: CreateOnePatientDefaultService,
    },
    {
      provide: CREATE_HISTORIES_DEFAULT_SERVICE,
      useClass: CreateHistoriesDefaultService,
    },
    {
      provide: FIND_PATIENTS_DEFAULT_SERVICE,
      useClass: FindPatientsDefaultService,
    },
    {
      provide: FIND_ONE_PATIENT_DEFAULT_SERVICE,
      useClass: FindOnePatientDefaultService,
    },
    {
      provide: FIND_HISTORIES_DEFAULT_SERVICE,
      useClass: FindHistoriesDefaultService,
    },
    {
      provide: PATIENT_POSTGRES_REPOSITORY,
      useClass: PatientPostgresPersistenceAdapter,
    },
    {
      provide: APP_FILTER,
      useClass: PatientHttpExceptionFilter,
    },
  ],
  controllers: [
    CreateOnePatientRestController,
    CreateHistoriesRestController,
    FindPatientsRestController,
    FindOnePatientRestController,
    FindHistoriesRestController,
  ],
  exports: [
    {
      provide: FIND_HISTORIES_DEFAULT_SERVICE,
      useClass: FindHistoriesDefaultService,
    },
  ],
})
export class PatientModule {}
