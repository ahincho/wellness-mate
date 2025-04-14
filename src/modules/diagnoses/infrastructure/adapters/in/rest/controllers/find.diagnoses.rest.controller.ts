import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  DIAGNOSIS_V1_ENDPOINT,
  FIND_DIAGNOSES_DEFAULT_SERVICE,
} from '@common/constants/diagnoses.constants';
import { PageMapper } from '@common/mappers/page.mapper';
import { PageResponse } from '@common/dtos/page.response';
import { ResourceEmptyInterceptor } from '@common/interceptors/resource.empty.interceptor';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { FindDiagnosesUseCase } from '@diagnoses/application/ports/in/find.diagnoses.use.case';
import { DiagnosisRestMapper } from '../mappers/diagnosis.rest.mapper';
import { DiagnosisResponse } from '../dtos/diagnosis.response';
import { DiagnosisQueryRequest } from '../dtos/diagnosis.query.request';

@Controller(DIAGNOSIS_V1_ENDPOINT)
export class FindDiagnosesRestController {
  constructor(
    @Inject(FIND_DIAGNOSES_DEFAULT_SERVICE)
    private readonly findDiagnosesUseCase: FindDiagnosesUseCase,
  ) {}
  @Get()
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceEmptyInterceptor)
  async findDiagnoses(
    @Query() diagnosisQueryRequest: DiagnosisQueryRequest,
  ): Promise<PageResponse<DiagnosisResponse>> {
    const diagnosisFilters = DiagnosisRestMapper.queryRequestToDomain(
      diagnosisQueryRequest,
    );
    const diagnosisPageResult =
      await this.findDiagnosesUseCase.execute(diagnosisFilters);
    return PageMapper.transformItems<Diagnosis, DiagnosisResponse>(
      diagnosisPageResult,
      DiagnosisRestMapper.domainToResponse,
    );
  }
}
