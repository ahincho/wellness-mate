import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';

export class ChatSendResponse {
  provider: ChatProvider;
  response: string;
  constructor(partial?: Partial<ChatSendResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
