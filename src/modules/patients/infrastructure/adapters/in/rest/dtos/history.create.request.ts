import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class HistoryCreateRequest {
  @ApiProperty({
    description: 'Description of the history (between 8 and 256 characters)',
    example: 'Patient shows symptoms of fever and cough.',
    minLength: 8,
    maxLength: 256,
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @Length(8, 256, {
    message: 'Description must be between 8 and 256 characters',
  })
  readonly description: string;
}
