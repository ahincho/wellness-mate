import { PageRequest } from '@common/dtos/page.request';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class DiagnosisCreateRequest extends PageRequest {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  readonly patientId: number;
}
