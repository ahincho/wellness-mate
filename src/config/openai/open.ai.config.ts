import { registerAs } from '@nestjs/config';

export default registerAs('openAi', () => ({
  apiKey: process.env.OPEN_AI_API_KEY,
}));
