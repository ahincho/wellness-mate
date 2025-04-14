import { ApiProperty } from '@nestjs/swagger';
import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';

export class ChatSendResponse {
  @ApiProperty({
    description: 'The provider used to send the message.',
    enum: ChatProvider,
    example: ChatProvider.OPEN_AI,
  })
  provider: ChatProvider;
  @ApiProperty({
    description: 'The response received from the chat provider.',
    example: 'I am here to assist you with any questions you may have.',
  })
  response: string;
  constructor(partial?: Partial<ChatSendResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
