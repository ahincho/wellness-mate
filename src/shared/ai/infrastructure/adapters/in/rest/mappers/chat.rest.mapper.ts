import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { ChatResponse } from '@shared/ai/domain/models/chat.response';
import { ChatSendRequest } from '../dtos/chat.send.request';
import { ChatSendResponse } from '../dtos/chat.send.response';

export class ChatRestMapper {
  static sendRequestToDomain(chatSendRequest: ChatSendRequest): ChatRequest {
    return new ChatRequest({ provider: chatSendRequest.provider, prompt: chatSendRequest.message });
  }
  static domainToResponse(chatResponse: ChatResponse): ChatSendResponse {
    return new ChatSendResponse({ provider: chatResponse.provider, response: chatResponse.content });
  }
}
