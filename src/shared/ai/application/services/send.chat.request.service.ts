import { Inject, Injectable } from '@nestjs/common';
import {
  AWS_CHAT_PORT,
  OPEN_AI_CHAT_PORT,
} from '@common/constants/ai.constants';
import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { ChatResponse } from '@shared/ai/domain/models/chat.response';
import { SendChatRequestUseCase } from '../ports/in/send.chat.request.use.case';
import { ChatPort } from '../ports/out/chat.port';

@Injectable()
export class SendChatRequestDefaultService implements SendChatRequestUseCase {
  constructor(
    @Inject(AWS_CHAT_PORT)
    private readonly chatPort: ChatPort,
  ) {}
  async execute(chatRequest: ChatRequest): Promise<ChatResponse> {
    return await this.chatPort.send(chatRequest);
  }
}
