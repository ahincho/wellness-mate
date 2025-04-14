import { ApiProperty } from '@nestjs/swagger';
import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

const chatProviders = Object.values(ChatProvider).join(', ');

export class ChatSendRequest {
  @ApiProperty({
    description: 'The message to send to the chat provider.',
    example: 'Hello, how can I help you today?',
    maxLength: 1024,
  })
  @IsString()
  @IsNotEmpty({ message: 'Message should not be empty' })
  @MaxLength(1024, { message: 'Message should not exceed 1024 characters' })
  readonly message: string;
  @ApiProperty({
    description: `The chat provider to use for sending the message. Must be one of the following: ${chatProviders}`,
    enum: ChatProvider,
    example: ChatProvider.OPEN_AI,
  })
  @IsEnum(ChatProvider, {
    message: `Provider must be one of the following: ${chatProviders}`,
  })
  @IsNotEmpty({ message: 'Provider is required' })
  readonly provider: ChatProvider;
}
