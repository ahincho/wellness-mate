import { PageRequest } from '@common/dtos/page.request';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class DiagnosisQueryRequest extends PageRequest {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly patientId: number;
}
