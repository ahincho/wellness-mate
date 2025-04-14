import { PageRequest } from '@common/dtos/page.request';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DiagnosisQueryRequest extends PageRequest {
  @ApiProperty({
    description: 'Id of the patient whose diagnoses are being queried',
    example: 42,
    minimum: 0,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'Patient id is required' })
  @IsInt({ message: 'Patient id must be an integer' })
  @Min(0)
  readonly patientId: number;
}
