import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { ChatResponse } from '@shared/ai/domain/models/chat.response';
import { ChatException } from '@shared/ai/domain/exceptions/chat.exception';
import { ChatPort } from '@shared/ai/application/ports/out/chat.port';
import { AwsBedrockChatMapper } from './aws.bedrock.chat.mapper';

@Injectable()
export class AwsBedrockChatAdapter implements ChatPort {
  private static readonly errorMessages = new Map<number, string>([
    [
      HttpStatus.BAD_REQUEST,
      'Bad Request. The request body send to AWS might be invalid or missing required fields.',
    ],
    [
      HttpStatus.UNAUTHORIZED,
      'Unauthorized. Check if the AWS credentials are correctly configured.',
    ],
    [HttpStatus.PAYMENT_REQUIRED, 'Insufficient balance in the AWS account'],
    [
      HttpStatus.FORBIDDEN,
      'Forbidden. The AWS security token included in the request is invalid.',
    ],
    [
      HttpStatus.TOO_MANY_REQUESTS,
      'Too many requests to AWS. Please try again later',
    ],
    [
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error. Something went wrong on AWS side.',
    ],
    [
      HttpStatus.GATEWAY_TIMEOUT,
      'Gateway Timeout. AWS services are taking longer than expected.',
    ],
  ]);
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    private readonly bedrockRuntimeClient: BedrockRuntimeClient,
  ) {}
  async send(chatRequest: ChatRequest): Promise<ChatResponse> {
    const requestBody = AwsBedrockChatMapper.domainToBedrock(chatRequest);
    const input = {
      modelId: 'amazon.nova-micro-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: new TextEncoder().encode(JSON.stringify(requestBody)),
    };
    const command = new InvokeModelCommand(input);
    try {
      const response = await this.bedrockRuntimeClient.send(command);
      const rawBody = new TextDecoder().decode(response.body);
      const responseBody = JSON.parse(rawBody);
      return AwsBedrockChatMapper.bedrockToDomain(responseBody);
    } catch (error) {
      const status = error?.$metadata?.httpStatusCode ?? 0;
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
      AwsBedrockChatAdapter.errorMessages.get(status) ??
      'Error processing the request to AWS Bedrock.'
    );
  }
}
