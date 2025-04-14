import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
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
  FIND_HISTORIES_DEFAULT_SERVICE,
  PATIENT_V1_ENDPOINT,
} from '@common/constants/patients.constants';
import { PATIENTS } from '@common/constants/api.contants';
import { PageResponse } from '@common/dtos/page.response';
import { PageMapper } from '@common/mappers/page.mapper';
import { ResourceEmptyInterceptor } from '@common/interceptors/resource.empty.interceptor';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { History } from '@patients/domain/models/history';
import { FindHistoriesUseCase } from '@patients/application/ports/in/find.histories.use.case';
import { HistoryResponse } from '../dtos/history.response';
import { PatientHistoryQueryRequest } from '../dtos/patient.history.query.request';
import { HistoryRestMapper } from '../mappers/history.rest.mapper';

@ApiTags(PATIENTS)
@ApiBearerAuth()
@Controller(PATIENT_V1_ENDPOINT)
export class FindHistoriesRestController {
  constructor(
    @Inject(FIND_HISTORIES_DEFAULT_SERVICE)
    private readonly findHistoriesUseCase: FindHistoriesUseCase,
  ) {}
  @Get(':patientId/histories')
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceEmptyInterceptor)
  @ApiOperation({
    summary: "Get the patient's histories",
    description:
      'Fetches a paginated list of histories for a specific patient.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A paginated list of histories for the given patient.',
    type: PageResponse,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Forbidden. Only users with ADMINISTRATOR role can access patient histories.',
  })
  async findHistories(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Query() patientHistoryQueryRequest: PatientHistoryQueryRequest,
  ): Promise<PageResponse<HistoryResponse>> {
    const historyFilters = HistoryRestMapper.queryRequestToDomain(
      patientId,
      patientHistoryQueryRequest,
    );
    const historyPageResult =
      await this.findHistoriesUseCase.execute(historyFilters);
    return PageMapper.transformItems<History, HistoryResponse>(
      historyPageResult,
      HistoryRestMapper.domainToResponse,
    );
  }
}
