import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '@shared/logging/infrastructure/configurations/logging.module';
import { AiModule } from '@shared/ai/infrastructure/configurations/ai.module';
import { PatientModule } from '@patients/infrastructure/configurations/patient.module';
import {
  CREATE_ONE_DIAGNOSIS_DEFAULT_SERVICE,
  DIAGNOSIS_POSTGRES_REPOSITORY,
  FIND_DIAGNOSES_DEFAULT_SERVICE,
  FIND_ONE_DIAGNOSIS_DEFAULT_SERVICE,
} from '@common/constants/diagnoses.constants';
import { CreateOneDiagnosisDefaultService } from '@diagnoses/application/services/create.one.diagnosis.default.service';
import { FindDiagnosesDefaultService } from '@diagnoses/application/services/find.diagnoses.default.service';
import { FindOneDiagnosisDefaultService } from '@diagnoses/application/services/find.one.diagnosis.default.service';
import { DiagnosisHttpExceptionFilter } from '../adapters/in/rest/filters/diagnosis.http.exception.filter';
import { CreateOneDiagnosisRestController } from '../adapters/in/rest/controllers/create.one.diagnosis.rest.controller';
import { FindDiagnosesRestController } from '../adapters/in/rest/controllers/find.diagnoses.rest.controller';
import { FindOneDiagnosisRestController } from '../adapters/in/rest/controllers/find.one.diagnosis.rest.controller';
import { DiagnosisPostgresPersistenceAdapter } from '../adapters/out/persistence/postgresql/diagnosis.postgres.persistence.adapter';
import { DiagnosisEntity } from '../adapters/out/persistence/postgresql/diagnosis.entity';

@Module({
  imports: [
    LoggingModule,
    AiModule,
    PatientModule,
    TypeOrmModule.forFeature([DiagnosisEntity]),
  ],
  providers: [
    {
      provide: CREATE_ONE_DIAGNOSIS_DEFAULT_SERVICE,
      useClass: CreateOneDiagnosisDefaultService,
    },
    {
      provide: FIND_DIAGNOSES_DEFAULT_SERVICE,
      useClass: FindDiagnosesDefaultService,
    },
    {
      provide: FIND_ONE_DIAGNOSIS_DEFAULT_SERVICE,
      useClass: FindOneDiagnosisDefaultService,
    },
    {
      provide: DIAGNOSIS_POSTGRES_REPOSITORY,
      useClass: DiagnosisPostgresPersistenceAdapter,
    },
    {
      provide: APP_FILTER,
      useClass: DiagnosisHttpExceptionFilter,
    },
  ],
  controllers: [
    CreateOneDiagnosisRestController,
    FindDiagnosesRestController,
    FindOneDiagnosisRestController,
  ],
  exports: [],
})
export class DiagnosisModule {}
