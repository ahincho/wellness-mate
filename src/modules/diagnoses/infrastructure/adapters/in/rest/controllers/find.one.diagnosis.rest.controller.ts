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
  DIAGNOSIS_V1_ENDPOINT,
  FIND_ONE_DIAGNOSIS_DEFAULT_SERVICE,
} from '@common/constants/diagnoses.constants';
import { DIAGNOSES } from '@common/constants/api.contants';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { FindOneDiagnosisUseCase } from '@diagnoses/application/ports/in/find.one.diagnosis.use.case';
import { DiagnosisRestMapper } from '../mappers/diagnosis.rest.mapper';
import { DiagnosisResponse } from '../dtos/diagnosis.response';

@ApiTags(DIAGNOSES)
@ApiBearerAuth()
@Controller(DIAGNOSIS_V1_ENDPOINT)
export class FindOneDiagnosisRestController {
  constructor(
    @Inject(FIND_ONE_DIAGNOSIS_DEFAULT_SERVICE)
    private readonly findOneDiagnosisUseCase: FindOneDiagnosisUseCase,
  ) {}
  @Get(':diagnosisId')
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @ApiOperation({
    summary: 'Create a diagnosis',
    description: 'Creates a diagnosis for a patient using an AI provider.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Diagnosis created successfully.',
    type: DiagnosisResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden. Only users with ADMINISTRATOR role can access.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request. Validation failed.',
  })
  async findOneDiagnosis(
    @Param('diagnosisId', ParseIntPipe) diagnosisId: number,
  ): Promise<DiagnosisResponse> {
    const diagnosis = await this.findOneDiagnosisUseCase.execute(diagnosisId);
    return DiagnosisRestMapper.domainToResponse(diagnosis);
  }
}
