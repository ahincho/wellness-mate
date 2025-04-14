import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiConfigService {
  constructor(private readonly configService: ConfigService) {}
  get apiKey() {
    return this.configService.get('openAi.apiKey');
  }
}

export default () => ({
  apiKey: process.env.OPEN_AI_API_KEY,
});
