import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FIND_PATIENTS_DEFAULT_SERVICE,
  PATIENT_V1_ENDPOINT,
} from '@common/constants/patients.constants';
import { PATIENTS } from '@common/constants/api.contants';
import { ResourceEmptyInterceptor } from '@common/interceptors/resource.empty.interceptor';
import { PageMapper } from '@common/mappers/page.mapper';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { Patient } from '@patients/domain/models/patient';
import { FindPatientsUseCase } from '@patients/application/ports/in/find.patients.use.case';
import { PatientQueryRequest } from '../dtos/patient.query.request';
import { PatientRestMapper } from '../mappers/patient.rest.mapper';
import { PatientResponse } from '../dtos/patient.response';

@ApiTags(PATIENTS)
@ApiBearerAuth()
@Controller(PATIENT_V1_ENDPOINT)
export class FindPatientsRestController {
  constructor(
    @Inject(FIND_PATIENTS_DEFAULT_SERVICE)
    private readonly findPatientsUseCase: FindPatientsUseCase,
  ) {}
  @Get()
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceEmptyInterceptor)
  @ApiOperation({
    summary: 'Find patients',
    description: 'Retrieves a list of patients based on the provided filters.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved the list of patients.',
    type: PatientResponse,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Forbidden. Only users with ADMINISTRATOR role can access the patients list.',
  })
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
