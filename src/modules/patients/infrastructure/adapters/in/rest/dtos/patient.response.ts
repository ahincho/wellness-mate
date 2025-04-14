import { ApiProperty } from '@nestjs/swagger';

export class PatientResponse {
  @ApiProperty({
    description: 'Unique identifier of the patient',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Firstname of the patient',
    example: 'John',
    minLength: 2,
    maxLength: 32,
  })
  firstname: string;
  @ApiProperty({
    description: 'Lastname of the patient',
    example: 'Doe',
    minLength: 2,
    maxLength: 32,
  })
  lastname: string;
  @ApiProperty({
    description: 'Email address of the patient',
    example: 'john.doe@example.com',
  })
  email: string;
  @ApiProperty({
    description: 'Birthday of the patient',
    example: '2000-01-01',
    format: 'date',
  })
  birthday: string;
  constructor(partial?: Partial<PatientResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
