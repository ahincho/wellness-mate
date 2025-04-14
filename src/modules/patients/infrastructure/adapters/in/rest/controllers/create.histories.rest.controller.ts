import {
  Body,
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  CREATE_HISTORIES_DEFAULT_SERVICE,
  PATIENT_V1_ENDPOINT,
} from '@common/constants/patients.constants';
import { ResourceCreatedInterceptor } from '@common/interceptors/resource.created.interceptor';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { CreateHistoriesUseCase } from '@patients/application/ports/in/create.histories.use.case';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { HistoryRestMapper } from '../mappers/history.rest.mapper';
import { CreateHistoriesRequest } from '../dtos/histories.create.request';
import { HistoryResponse } from '../dtos/history.response';

@Controller(`${PATIENT_V1_ENDPOINT}`)
export class CreateHistoriesRestController {
  constructor(
    @Inject(CREATE_HISTORIES_DEFAULT_SERVICE)
    private readonly createHistoriesUseCase: CreateHistoriesUseCase,
  ) {}
  @Post(':patientId/histories')
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceCreatedInterceptor)
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
