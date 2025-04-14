import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FIND_ONE_PATIENT_DEFAULT_SERVICE,
  PATIENT_V1_ENDPOINT,
} from '@common/constants/patients.constants';
import { PATIENTS } from '@common/constants/api.contants';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { FindOnePatientUseCase } from '@patients/application/ports/in/find.one.patient.use.case';
import { PatientRestMapper } from '../mappers/patient.rest.mapper';
import { PatientResponse } from '../dtos/patient.response';

@ApiTags(PATIENTS)
@ApiBearerAuth()
@Controller(PATIENT_V1_ENDPOINT)
export class FindOnePatientRestController {
  constructor(
    @Inject(FIND_ONE_PATIENT_DEFAULT_SERVICE)
    private readonly findOnePatientUseCase: FindOnePatientUseCase,
  ) {}
  @Get(':patientId')
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @ApiOperation({
    summary: 'Get a patient by id',
    description: "Fetches a single patient's details by their id.",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved the patient details.',
    type: PatientResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Forbidden. Only users with ADMINISTRATOR role can access patient details.',
  })
  async findOnePatient(
    @Param('patientId', ParseIntPipe) patientId: number,
  ): Promise<PatientResponse> {
    const patient = await this.findOnePatientUseCase.execute(patientId);
    return PatientRestMapper.domainToResponse(patient);
  }
}
