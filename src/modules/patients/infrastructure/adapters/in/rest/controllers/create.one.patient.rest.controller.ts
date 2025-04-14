import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  CREATE_ONE_PATIENT_DEFAULT_SERVICE,
  PATIENT_V1_ENDPOINT,
} from '@common/constants/patients.constants';
import { ResourceCreatedInterceptor } from '@common/interceptors/resource.created.interceptor';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { CreateOnePatientUseCase } from '@patients/application/ports/in/create.one.patient.use.case';
import { PatientCreateRequest } from '../dtos/patient.create.request';
import { PatientResponse } from '../dtos/patient.response';
import { PatientRestMapper } from '../mappers/patient.rest.mapper';

@Controller(PATIENT_V1_ENDPOINT)
export class CreateOnePatientRestController {
  constructor(
    @Inject(CREATE_ONE_PATIENT_DEFAULT_SERVICE)
    private readonly createOnePatientUseCase: CreateOnePatientUseCase,
  ) {}
  @Post()
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceCreatedInterceptor)
  async createOnePatient(
    @Body() patientCreateRequest: PatientCreateRequest,
  ): Promise<PatientResponse> {
    const patient =
      PatientRestMapper.createRequestToDomain(patientCreateRequest);
    const savedPatient = await this.createOnePatientUseCase.execute(patient);
    return PatientRestMapper.domainToResponse(savedPatient);
  }
}
