import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
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
  CREATE_HISTORIES_DEFAULT_SERVICE,
  PATIENT_V1_ENDPOINT,
} from '@common/constants/patients.constants';
import { PATIENTS } from '@common/constants/api.contants';
import { ResourceCreatedInterceptor } from '@common/interceptors/resource.created.interceptor';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { CreateHistoriesUseCase } from '@patients/application/ports/in/create.histories.use.case';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { HistoryRestMapper } from '../mappers/history.rest.mapper';
import { CreateHistoriesRequest } from '../dtos/histories.create.request';
import { HistoryResponse } from '../dtos/history.response';

@ApiTags(PATIENTS)
@ApiBearerAuth()
@Controller(PATIENT_V1_ENDPOINT)
export class CreateHistoriesRestController {
  constructor(
    @Inject(CREATE_HISTORIES_DEFAULT_SERVICE)
    private readonly createHistoriesUseCase: CreateHistoriesUseCase,
  ) {}
  @Post(':patientId/histories')
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceCreatedInterceptor)
  @ApiOperation({
    summary: 'Create histories for a specific patient',
    description:
      'Creates one or more history entries for a patient by patientId.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Histories created successfully',
    type: [HistoryResponse],
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Forbidden. Only users with ADMINISTRATOR role can create histories.',
  })
  async createHistories(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Body() historiesCreateRequest: CreateHistoriesRequest,
  ): Promise<HistoryResponse[]> {
    const histories = historiesCreateRequest.histories.map(
      HistoryRestMapper.createRequestToDomain,
    );
    const savedHistories = await this.createHistoriesUseCase.execute(
      patientId,
      histories,
    );
    return savedHistories.map(HistoryRestMapper.domainToResponse);
  }
}
