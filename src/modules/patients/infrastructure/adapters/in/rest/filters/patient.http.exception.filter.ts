import { Catch, HttpStatus } from '@nestjs/common';
import { BaseHttpExceptionFilter } from '@common/filters/base.http.exception.filter';
import { PatientDuplicationException } from '@patients/domain/exceptions/patient.duplication.exception';
import { PatientNotFoundException } from '@patients/domain/exceptions/patient.not.found.exception';

@Catch(PatientDuplicationException, PatientNotFoundException)
export class PatientHttpExceptionFilter extends BaseHttpExceptionFilter<
  PatientDuplicationException | PatientNotFoundException
> {
  protected exceptionToStatusMap: Record<string, number> = {
    PatientDuplicationException: HttpStatus.CONFLICT,
    PatientNotFoundException: HttpStatus.NOT_FOUND,
  };
}
