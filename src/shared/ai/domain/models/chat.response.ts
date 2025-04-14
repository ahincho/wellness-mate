import { ChatProvider } from "../enums/chat.provider";

export class ChatResponse {
  provider: ChatProvider;
  content: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  constructor(partial?: Partial<ChatResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
