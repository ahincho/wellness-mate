import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

const chatProviders = Object.values(ChatProvider).join(', ');

export class ChatSendRequest {
  @IsString()
  @IsNotEmpty({ message: 'Message should not be empty' })
  @MaxLength(1024, { message: 'Message should not exceed 1024 characters' })
  readonly message: string;
  @IsEnum(ChatProvider, {
    message: `Provider must be one of the following: ${chatProviders}`,
  })
  @IsNotEmpty({ message: 'Provider is required' })
  readonly provider: ChatProvider;
}
