import { IsNotEmpty, IsString, Length } from 'class-validator';

export class HistoryCreateRequest {
  @IsString()
  @IsNotEmpty()
  @Length(8, 256)
  readonly description: string;
}
