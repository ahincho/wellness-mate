import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAiConfigService } from './open.ai.config.service';
import openAiConfig from './open.ai.config';

@Module({
  imports: [ConfigModule.forFeature(openAiConfig)],
  providers: [OpenAiConfigService],
  exports: [OpenAiConfigService],
})
export class OpenAiConfigModule {}
