import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';
import { ChatRequest } from '@shared/ai/domain/models/chat.request';
import { ChatResponse } from '@shared/ai/domain/models/chat.response';
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/chat';

export class OpenAiChatMapper {
  static domainToOpenAi(
    chatRequest: ChatRequest,
    model: string,
  ): ChatCompletionCreateParams {
    const systemMessage: ChatCompletionSystemMessageParam | undefined =
      chatRequest.profile
        ? {
            role: 'system',
            content: chatRequest.profile,
          }
        : undefined;
    const contextMessages: ChatCompletionUserMessageParam[] =
      chatRequest.context?.map((content) => ({
        role: 'user',
        content,
      })) ?? [];
    const messages: ChatCompletionMessageParam[] = [
      ...(systemMessage ? [systemMessage] : []),
      ...contextMessages,
      {
        role: 'user',
        content: chatRequest.prompt,
      },
    ];
    return {
      model,
      messages,
      temperature: chatRequest.temperature ?? 0.7,
      max_tokens: chatRequest.maxTokens ?? 256,
    };
  }
  static openAiToDomain(response: ChatCompletion): ChatResponse {
    const choice = response.choices[0];
    return {
      provider: ChatProvider.OPEN_AI,
      content: choice.message?.content ?? '',
      model: `openai.${response.model}`,
      promptTokens: response.usage?.prompt_tokens ?? 0,
      completionTokens: response.usage?.completion_tokens ?? 0,
      totalTokens: response.usage?.total_tokens ?? 0,
    };
  }
}
