import { NovaChatMessageContent } from './nova.chat.message.content';

export interface NovaChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: NovaChatMessageContent[];
}
