import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CREATE_ONE_PATIENT_DEFAULT_SERVICE,
  PATIENT_V1_ENDPOINT,
} from '@common/constants/patients.constants';
import { PATIENTS } from '@common/constants/api.contants';
import { ResourceCreatedInterceptor } from '@common/interceptors/resource.created.interceptor';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { CreateOnePatientUseCase } from '@patients/application/ports/in/create.one.patient.use.case';
import { PatientCreateRequest } from '../dtos/patient.create.request';
import { PatientResponse } from '../dtos/patient.response';
import { PatientRestMapper } from '../mappers/patient.rest.mapper';

@ApiTags(PATIENTS)
@ApiBearerAuth()
@Controller(PATIENT_V1_ENDPOINT)
export class CreateOnePatientRestController {
  constructor(
    @Inject(CREATE_ONE_PATIENT_DEFAULT_SERVICE)
    private readonly createOnePatientUseCase: CreateOnePatientUseCase,
  ) {}
  @Post()
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceCreatedInterceptor)
  @ApiOperation({
    summary: 'Create a new patient',
    description: 'Creates a new patient based on the provided information.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Patient created successfully',
    type: PatientResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Forbidden. Only users with ADMINISTRATOR role can create patients.',
  })
  async createOnePatient(
    @Body() patientCreateRequest: PatientCreateRequest,
  ): Promise<PatientResponse> {
    const patient =
      PatientRestMapper.createRequestToDomain(patientCreateRequest);
    const savedPatient = await this.createOnePatientUseCase.execute(patient);
    return PatientRestMapper.domainToResponse(savedPatient);
  }
}
