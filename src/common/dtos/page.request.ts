import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PageRequest {
  @ApiProperty({
    description: 'Page number to retrieve (0-based index)',
    example: 0,
    minimum: 0,
    default: 0,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  readonly page: number = 0;
  @ApiProperty({
    description: 'Number of items per page (max: 50)',
    example: 10,
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(50)
  readonly size: number = 10;
}
