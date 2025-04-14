import { NovaChatMessage } from './nova.chat.message';
import { NovaChatMessageContent } from './nova.chat.message.content';

export type NovaRequestBody = {
  system?: NovaChatMessageContent[];
  messages: NovaChatMessage[];
  inferenceConfig?: {
    maxTokens?: number;
    topP?: number;
    topK?: number;
    temperature?: number;
  };
};
