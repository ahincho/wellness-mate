import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ValidateNested } from 'class-validator';
import { HistoryCreateRequest } from './history.create.request';

export class CreateHistoriesRequest {
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => HistoryCreateRequest)
  histories: HistoryCreateRequest[];
}
