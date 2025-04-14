import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  DIAGNOSIS_V1_ENDPOINT,
  FIND_DIAGNOSES_DEFAULT_SERVICE,
} from '@common/constants/diagnoses.constants';
import { DIAGNOSES } from '@common/constants/api.contants';
import { PageMapper } from '@common/mappers/page.mapper';
import { PageResponse } from '@common/dtos/page.response';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { FindDiagnosesUseCase } from '@diagnoses/application/ports/in/find.diagnoses.use.case';
import { DiagnosisRestMapper } from '../mappers/diagnosis.rest.mapper';
import { DiagnosisResponse } from '../dtos/diagnosis.response';
import { DiagnosisQueryRequest } from '../dtos/diagnosis.query.request';
import { Response } from 'express';

@ApiTags(DIAGNOSES)
@ApiBearerAuth()
@Controller(DIAGNOSIS_V1_ENDPOINT)
export class FindDiagnosesRestController {
  constructor(
    @Inject(FIND_DIAGNOSES_DEFAULT_SERVICE)
    private readonly findDiagnosesUseCase: FindDiagnosesUseCase,
  ) {}
  @Get()
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @ApiOperation({
    summary: 'Get diagnoses',
    description:
      'Retrieves a paginated list of diagnoses. Supports filters and pagination.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of diagnoses returned successfully.',
    type: PageResponse<DiagnosisResponse>,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No diagnoses found with the given filters.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden. Only users with ADMINISTRATOR role can access.',
  })
  @ApiQuery({ name: 'patientId', required: true, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  async findDiagnoses(
    @Query() diagnosisQueryRequest: DiagnosisQueryRequest,
    @Res() response: Response,
  ): Promise<void> {
    const diagnosisFilters = DiagnosisRestMapper.queryRequestToDomain(
      diagnosisQueryRequest,
    );
    const diagnosisPageResult =
      await this.findDiagnosesUseCase.execute(diagnosisFilters);
    if (diagnosisPageResult.items.length === 0) {
      response.status(HttpStatus.NO_CONTENT).send();
      return;
    }
    const responseBody = PageMapper.transformItems<
      Diagnosis,
      DiagnosisResponse
    >(diagnosisPageResult, DiagnosisRestMapper.domainToResponse);
    response.status(HttpStatus.OK).json(responseBody);
  }
}
