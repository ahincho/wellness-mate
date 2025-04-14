export class ChatResponse {
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
