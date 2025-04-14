import { ApiProperty } from '@nestjs/swagger';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';

export class DiagnosisResponse {
  @ApiProperty({
    description: 'Unique identifier for the diagnosis',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Content or description of the diagnosis',
    example: 'Diagnosis for patient with flu symptoms',
  })
  content: string;
  @ApiProperty({
    description: 'Timestamp when the diagnosis was created',
    example: '2025-04-13T16:32:00.000Z',
  })
  createdAt: Date;
  constructor(partial?: Partial<Diagnosis>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
