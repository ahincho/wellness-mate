import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { ChatResponse } from '@shared/ai/domain/models/chat.response';

export interface SendChatRequestUseCase {
  execute(chatRequest: ChatRequest): Promise<ChatResponse>;
}
