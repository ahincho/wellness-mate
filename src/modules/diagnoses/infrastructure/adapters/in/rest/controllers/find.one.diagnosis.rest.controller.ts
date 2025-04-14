import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import {
  DIAGNOSIS_V1_ENDPOINT,
  FIND_ONE_DIAGNOSIS_DEFAULT_SERVICE,
} from '@common/constants/diagnoses.constants';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { FindOneDiagnosisUseCase } from '@diagnoses/application/ports/in/find.one.diagnosis.use.case';
import { DiagnosisRestMapper } from '../mappers/diagnosis.rest.mapper';
import { DiagnosisResponse } from '../dtos/diagnosis.response';

@Controller(DIAGNOSIS_V1_ENDPOINT)
export class FindOneDiagnosisRestController {
  constructor(
    @Inject(FIND_ONE_DIAGNOSIS_DEFAULT_SERVICE)
    private readonly findOneDiagnosisUseCase: FindOneDiagnosisUseCase,
  ) {}
  @Get(':diagnosisId')
  @HasAnyRole(ADMINISTRATOR_ROLE)
  async findOneDiagnosis(
    @Param('diagnosisId', ParseIntPipe) diagnosisId: number,
  ): Promise<DiagnosisResponse> {
    const diagnosis = await this.findOneDiagnosisUseCase.execute(diagnosisId);
    return DiagnosisRestMapper.domainToResponse(diagnosis);
  }
}
