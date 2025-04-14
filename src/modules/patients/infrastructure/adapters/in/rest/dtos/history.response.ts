import { ApiProperty } from '@nestjs/swagger';

export class HistoryResponse {
  @ApiProperty({
    description: 'Unique identifier for the history record',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Description of the history',
    example: 'Patient shows symptoms of fever and cough.',
  })
  description: string;
  @ApiProperty({
    description: 'Timestamp when the history record was created',
    example: '2025-04-13T16:32:00.000Z',
  })
  createdAt: Date;
  constructor(partial?: Partial<HistoryResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
