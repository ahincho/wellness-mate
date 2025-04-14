import { ChatProvider } from '../enums/chat.provider';

export class ChatRequest {
  provider: ChatProvider;
  profile: string;
  prompt: string;
  context?: string[];
  temperature: number;
  maxTokens: number;
  constructor(partial?: Partial<ChatRequest>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
