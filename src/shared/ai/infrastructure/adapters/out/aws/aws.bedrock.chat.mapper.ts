import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { ChatResponse } from '@shared/ai/domain/models/chat.response';
import { NovaRequestBody } from './@types/nova.request.body';
import { NovaChatResponseBody } from './@types/nova.chat.response.body';
import { NovaChatMessage } from './@types/nova.chat.message';
import { NovaChatMessageContent } from './@types/nova.chat.message.content';

export class AwsBedrockChatMapper {
  static domainToBedrock(chatRequest: ChatRequest): NovaRequestBody {
    const systemMessage = chatRequest.profile
      ? ([{ text: chatRequest.profile }] as NovaChatMessageContent[])
      : undefined;
    const contextMessages: NovaChatMessage[] =
      chatRequest.context?.map((content) => ({
        role: 'user',
        content: [{ text: content }] as NovaChatMessageContent[],
      })) ?? [];
    return {
      system: systemMessage,
      messages: [
        ...contextMessages,
        {
          role: 'user',
          content: [{ text: chatRequest.prompt }] as NovaChatMessageContent[],
        },
      ],
      inferenceConfig: {
        maxTokens: chatRequest.maxTokens ?? 256,
        topP: 0.9,
        topK: 20,
        temperature: 0.7,
      },
    };
  }
  static bedrockToDomain(response: NovaChatResponseBody): ChatResponse {
    const content = response?.output?.message?.content?.[0]?.text ?? '';
    const promptTokens = response?.usage?.inputTokens ?? 0;
    const completionTokens = response?.usage?.outputTokens ?? 0;
    const totalTokens = promptTokens + completionTokens;
    return new ChatResponse({
      content,
      model: 'amazon.nova-micro-v1:0',
      promptTokens,
      completionTokens,
      totalTokens,
    });
  }
}
