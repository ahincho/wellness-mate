import { Inject, Injectable } from '@nestjs/common';
import {
  AWS_CHAT_PORT,
  OPEN_AI_CHAT_PORT,
} from '@common/constants/ai.constants';
import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';
import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { ChatResponse } from '@shared/ai/domain/models/chat.response';
import { ChatException } from '@shared/ai/domain/exceptions/chat.exception';
import { SendChatRequestUseCase } from '../ports/in/send.chat.request.use.case';
import { ChatPort } from '../ports/out/chat.port';

@Injectable()
export class SendChatRequestDefaultService implements SendChatRequestUseCase {
  private readonly strategyMap: Record<ChatProvider, ChatPort>;
  constructor(
    @Inject(OPEN_AI_CHAT_PORT)
    private readonly openAiChatPort: ChatPort,
    @Inject(AWS_CHAT_PORT)
    private readonly awsChatPort: ChatPort,
  ) {
    this.strategyMap = {
      [ChatProvider.OPEN_AI]: this.openAiChatPort,
      [ChatProvider.AWS_BEDROCK]: this.awsChatPort,
    };
  }
  async execute(chatRequest: ChatRequest): Promise<ChatResponse> {
    const chatPort = this.strategyMap[chatRequest.provider];
    if (!chatPort) {
      throw new ChatException(`No strategy found for provider: ${chatRequest.provider}`);
    }
    return await chatPort.send(chatRequest);
  }
}
