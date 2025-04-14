import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { OpenAiConfigModule } from '@config/openai/open.ai.config.module';
import { AwsConfigModule } from '@config/aws/aws.config.module';
import {
  AWS_CHAT_PORT,
  OPEN_AI_CHAT_PORT,
  SEND_CHAT_REQUEST_DEFAULT_SERVICE,
} from '@common/constants/ai.constants';
import { SendChatRequestDefaultService } from '@shared/ai/application/services/send.chat.request.service';
import { LoggingModule } from '@shared/logging/infrastructure/configurations/logging.module';
import { ChatHttpExceptionFilter } from '../adapters/in/rest/filters/chat.http.exception.filter';
import { SendChatRequestRestController } from '../adapters/in/rest/controllers/send.chat.request.rest.controller';
import { OpenAiProvider } from '../adapters/out/openai/open.ai.provider';
import { OpenAiChatAdapter } from '../adapters/out/openai/open.ai.chat.adapter';
import { AwsBedrockProvider } from '../adapters/out/aws/aws.bedrock.provider';
import { AwsBedrockChatAdapter } from '../adapters/out/aws/aws.bedrock.chat.adapter';

@Module({
  imports: [LoggingModule, OpenAiConfigModule, AwsConfigModule],
  providers: [
    OpenAiProvider,
    AwsBedrockProvider,
    {
      provide: SEND_CHAT_REQUEST_DEFAULT_SERVICE,
      useClass: SendChatRequestDefaultService,
    },
    {
      provide: OPEN_AI_CHAT_PORT,
      useClass: OpenAiChatAdapter,
    },
    {
      provide: AWS_CHAT_PORT,
      useClass: AwsBedrockChatAdapter,
    },
    {
      provide: APP_FILTER,
      useClass: ChatHttpExceptionFilter,
    },
  ],
  controllers: [SendChatRequestRestController],
  exports: [
    {
      provide: SEND_CHAT_REQUEST_DEFAULT_SERVICE,
      useClass: SendChatRequestDefaultService,
    },
  ],
})
export class AiModule {}
