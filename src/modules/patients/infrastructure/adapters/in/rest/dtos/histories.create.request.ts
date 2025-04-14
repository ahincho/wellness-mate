import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ValidateNested } from 'class-validator';
import { HistoryCreateRequest } from './history.create.request';

export class CreateHistoriesRequest {
  @ApiProperty({
    description: 'List of histories to be created',
    type: [HistoryCreateRequest],
    minItems: 1,
    maxItems: 10,
  })
  @ArrayMinSize(1, { message: 'At least one history is required' })
  @ArrayMaxSize(10, {
    message: 'A maximum of 10 histories can be created at once',
  })
  @ValidateNested({ each: true })
  @Type(() => HistoryCreateRequest)
  histories: HistoryCreateRequest[];
}
