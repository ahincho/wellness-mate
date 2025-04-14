import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  CREATE_ONE_DIAGNOSIS_DEFAULT_SERVICE,
  DIAGNOSIS_V1_ENDPOINT,
} from '@common/constants/diagnoses.constants';
import { Page } from '@common/models/page';
import { ResourceCreatedInterceptor } from '@common/interceptors/resource.created.interceptor';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { CreateOneDiagnosisUseCase } from '@diagnoses/application/ports/in/create.one.diagnosis.use.case';
import { DiagnosisRestMapper } from '../mappers/diagnosis.rest.mapper';
import { DiagnosisCreateRequest } from '../dtos/diagnosis.create.request';
import { DiagnosisResponse } from '../dtos/diagnosis.response';

@Controller(DIAGNOSIS_V1_ENDPOINT)
export class CreateOneDiagnosisRestController {
  constructor(
    @Inject(CREATE_ONE_DIAGNOSIS_DEFAULT_SERVICE)
    private readonly createOneDiagnosisUseCase: CreateOneDiagnosisUseCase,
  ) {}
  @Post()
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceCreatedInterceptor)
  async createOneDiagnosis(
    @Body() diagnosisCreateRequest: DiagnosisCreateRequest,
  ): Promise<DiagnosisResponse> {
    const { patientId } = diagnosisCreateRequest;
    const page = new Page({
      number: diagnosisCreateRequest.page,
      size: diagnosisCreateRequest.size,
    });
    const savedDiagnosis = await this.createOneDiagnosisUseCase.execute(
      patientId,
      page,
    );
    return DiagnosisRestMapper.domainToResponse(savedDiagnosis);
  }
}
