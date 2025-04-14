import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { ChatResponse } from '@shared/ai/domain/models/chat.response';

export interface ChatPort {
  send(chatRequest: ChatRequest): Promise<ChatResponse>;
}
