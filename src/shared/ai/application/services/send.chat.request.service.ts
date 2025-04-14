import { Inject, Injectable } from '@nestjs/common';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import {
  AWS_CHAT_PORT,
  OPEN_AI_CHAT_PORT,
} from '@common/constants/ai.constants';
import { ModuleEnum } from '@common/enums/module.enum';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
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
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
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
      const exception = new ChatException(
        `No strategy found for provider: ${chatRequest.provider}`,
      );
      await this.createOneLogUseCase.execute(
        new Log({
          module: ModuleEnum.AI,
          layer: Layer.APPLICATION,
          level: Level.ERROR,
          message: exception.message,
        }),
      );
      throw exception;
    }
    const chatResponse = await chatPort.send(chatRequest);
    await this.createOneLogUseCase.execute(
      new Log({
        module: ModuleEnum.AI,
        layer: Layer.APPLICATION,
        level: Level.INFO,
        message: `Chat request sent to ${chatRequest.provider} using model ${chatResponse.model}`,
      }),
    );
    return chatResponse;
  }
}
