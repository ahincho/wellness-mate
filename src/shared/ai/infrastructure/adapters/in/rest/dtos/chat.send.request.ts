import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class ChatSendRequest {
  @IsString()
  @IsNotEmpty({ message: 'Message should not be empty' })
  @MaxLength(1024, { message: 'Message should not exceed 1024 characters' })
  readonly message: string;
  @IsEnum(ChatProvider, { message: 'Provider must be a valid ChatProvider value' })
  @IsNotEmpty({ message: 'Provider is required' })
  readonly provider: ChatProvider;
}
