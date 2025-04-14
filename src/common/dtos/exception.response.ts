import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponse {
  @ApiProperty({
    description: 'The request path where the exception occurred',
    example: '/api/v1/diagnoses/123',
  })
  path: string;
  @ApiProperty({
    description: 'The HTTP method used for the request',
    example: 'GET',
  })
  method: string;
  @ApiProperty({
    description: 'HTTP status code of the response',
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
  @ApiProperty({
    description: 'Short description of the HTTP status',
    example: 'Not Found',
  })
  statusDescription: string;
  @ApiProperty({
    description: 'Date and time when the exception was thrown',
    example: '2025-04-13T16:32:00.000Z',
  })
  timestamp: Date;
  @ApiProperty({
    description: 'Detailed message about the exception',
    example: `Diagnosis with id '123' was not found`,
  })
  message: string;
  constructor(partial?: Partial<ExceptionResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
