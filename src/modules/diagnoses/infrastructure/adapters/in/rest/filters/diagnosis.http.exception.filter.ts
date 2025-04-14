import { Catch, HttpStatus } from '@nestjs/common';
import { BaseHttpExceptionFilter } from '@common/filters/base.http.exception.filter';
import { HistoriesNotFoundException } from '@diagnoses/domain/exceptions/histories.not.found.exception';
import { DiagnosisNotFoundException } from '@diagnoses/domain/exceptions/diagnosis.not.found.exception';

@Catch(HistoriesNotFoundException, DiagnosisNotFoundException)
export class DiagnosisHttpExceptionFilter extends BaseHttpExceptionFilter<
  HistoriesNotFoundException | DiagnosisNotFoundException
> {
  protected exceptionToStatusMap: Record<string, number> = {
    HistoriesNotFoundException: HttpStatus.BAD_REQUEST,
    DiagnosisNotFoundException: HttpStatus.NOT_FOUND,
  };
}
