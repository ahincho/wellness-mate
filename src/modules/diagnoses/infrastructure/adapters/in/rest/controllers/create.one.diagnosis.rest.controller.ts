import {
  Body,
  Controller,
  HttpStatus,
  Inject,
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
  CREATE_ONE_DIAGNOSIS_DEFAULT_SERVICE,
  DIAGNOSIS_V1_ENDPOINT,
} from '@common/constants/diagnoses.constants';
import { DIAGNOSES } from '@common/constants/api.contants';
import { Page } from '@common/models/page';
import { ResourceCreatedInterceptor } from '@common/interceptors/resource.created.interceptor';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { CreateOneDiagnosisUseCase } from '@diagnoses/application/ports/in/create.one.diagnosis.use.case';
import { DiagnosisRestMapper } from '../mappers/diagnosis.rest.mapper';
import { DiagnosisCreateRequest } from '../dtos/diagnosis.create.request';
import { DiagnosisResponse } from '../dtos/diagnosis.response';

@ApiTags(DIAGNOSES)
@ApiBearerAuth()
@Controller(DIAGNOSIS_V1_ENDPOINT)
export class CreateOneDiagnosisRestController {
  constructor(
    @Inject(CREATE_ONE_DIAGNOSIS_DEFAULT_SERVICE)
    private readonly createOneDiagnosisUseCase: CreateOneDiagnosisUseCase,
  ) {}
  @Post()
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @UseInterceptors(ResourceCreatedInterceptor)
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
  async createOneDiagnosis(
    @Body() diagnosisCreateRequest: DiagnosisCreateRequest,
  ): Promise<DiagnosisResponse> {
    const { patientId, chatProvider } = diagnosisCreateRequest;
    const page = new Page({
      number: diagnosisCreateRequest.page,
      size: diagnosisCreateRequest.size,
    });
    const savedDiagnosis = await this.createOneDiagnosisUseCase.execute(
      patientId,
      page,
      chatProvider,
    );
    return DiagnosisRestMapper.domainToResponse(savedDiagnosis);
  }
}
