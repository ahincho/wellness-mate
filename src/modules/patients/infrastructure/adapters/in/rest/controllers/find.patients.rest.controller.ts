import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  FIND_PATIENTS_DEFAULT_SERVICE,
  PATIENT_V1_ENDPOINT,
} from '@common/constants/patients.constants';
import { ResourceEmptyInterceptor } from '@common/interceptors/resource.empty.interceptor';
import { PageMapper } from '@common/mappers/page.mapper';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { Patient } from '@patients/domain/models/patient';
import { FindPatientsUseCase } from '@patients/application/ports/in/find.patients.use.case';
import { PatientQueryRequest } from '../dtos/patient.query.request';
import { PatientRestMapper } from '../mappers/patient.rest.mapper';
import { PatientResponse } from '../dtos/patient.response';

@Controller(PATIENT_V1_ENDPOINT)
export class FindPatientsRestController {
  constructor(
    @Inject(FIND_PATIENTS_DEFAULT_SERVICE)
    private readonly findPatientsUseCase: FindPatientsUseCase,
  ) {}
  @Get()
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceEmptyInterceptor)
  async findPatients(@Query() patientQueryRequest: PatientQueryRequest) {
    const patientFilters =
      PatientRestMapper.queryRequestToDomain(patientQueryRequest);
    const patientPageResult =
      await this.findPatientsUseCase.execute(patientFilters);
    return PageMapper.transformItems<Patient, PatientResponse>(
      patientPageResult,
      PatientRestMapper.domainToResponse,
    );
  }
}
