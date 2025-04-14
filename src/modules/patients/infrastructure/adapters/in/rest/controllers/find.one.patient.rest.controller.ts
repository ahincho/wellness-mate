import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import {
  FIND_ONE_PATIENT_DEFAULT_SERVICE,
  PATIENT_V1_ENDPOINT,
} from '@common/constants/patients.constants';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { FindOnePatientUseCase } from '@patients/application/ports/in/find.one.patient.use.case';
import { PatientRestMapper } from '../mappers/patient.rest.mapper';
import { PatientResponse } from '../dtos/patient.response';

@Controller(PATIENT_V1_ENDPOINT)
export class FindOnePatientRestController {
  constructor(
    @Inject(FIND_ONE_PATIENT_DEFAULT_SERVICE)
    private readonly findOnePatientUseCase: FindOnePatientUseCase,
  ) {}
  @Get(':patientId')
  @HasAnyRole(ADMINISTRATOR_ROLE)
  async findOnePatient(
    @Param('patientId', ParseIntPipe) patientId: number,
  ): Promise<PatientResponse> {
    const patient = await this.findOnePatientUseCase.execute(patientId);
    return PatientRestMapper.domainToResponse(patient);
  }
}
