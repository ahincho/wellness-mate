import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { ChatPort } from '@shared/ai/application/ports/out/chat.port';
import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { ChatResponse } from '@shared/ai/domain/models/chat.response';
import { ChatException } from '@shared/ai/domain/exceptions/chat.exception';
import { OpenAiChatMapper } from './open.ai.chat.mapper';
import OpenAI from 'openai';

@Injectable()
export class OpenAiChatAdapter implements ChatPort {
  private static readonly errorMessages = new Map<number, string>([
    [
      HttpStatus.BAD_REQUEST,
      'Bad Request. The request body send to OpenAI might be invalid or missing required fields.',
    ],
    [
      HttpStatus.UNAUTHORIZED,
      'Unauthorized. Check if the OpenAI credentials are correctly configured',
    ],
    [HttpStatus.PAYMENT_REQUIRED, 'Insufficient balance in the OpenAI account'],
    [
      HttpStatus.FORBIDDEN,
      'Forbidden. The OpenAI security token included in the request is invalid.',
    ],
    [
      HttpStatus.TOO_MANY_REQUESTS,
      'Too many requests to OpenAI. Please try again later',
    ],
    [
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error. Something went wrong on OpenAI side.',
    ],
    [
      HttpStatus.GATEWAY_TIMEOUT,
      'Gateway Timeout. AWS services are taking longer than expected.',
    ],
  ]);
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    private readonly openAi: OpenAI,
  ) {}
  async send(chatRequest: ChatRequest): Promise<ChatResponse> {
    try {
      const openAiChatRequest = OpenAiChatMapper.domainToOpenAi(
        chatRequest,
        'gpt-4o',
      );
      const openAiChatResponse = await this.openAi.chat.completions.create({
        ...openAiChatRequest,
        stream: false,
      });
      return OpenAiChatMapper.openAiToDomain(openAiChatResponse);
    } catch (error) {
      const status = typeof error?.status === 'number' ? error.status : 0;
      const errorMessage = this.handleErrorResponse(status);
      const exception = new ChatException(errorMessage);
      await this.createOneLogUseCase.execute(
        new Log({
          module: exception.module,
          layer: Layer.INFRASTRUCTURE,
          level: Level.ERROR,
          message: exception.message,
        }),
      );
      throw exception;
    }
  }
  private handleErrorResponse(status: number): string {
    return (
      OpenAiChatAdapter.errorMessages.get(status) ??
      'Error processing the request to OpenAI'
    );
  }
}
