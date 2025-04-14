import { Provider } from '@nestjs/common';
import { OpenAiConfigService } from '@config/openai/open.ai.config.service';
import { OpenAI } from 'openai';

export const OpenAiProvider: Provider = {
  provide: OpenAI,
  useFactory: (openAiConfigService: OpenAiConfigService) => {
    return new OpenAI({
      apiKey: openAiConfigService.apiKey,
    });
  },
  inject: [OpenAiConfigService],
};
