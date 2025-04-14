export class ChatRequest {
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
