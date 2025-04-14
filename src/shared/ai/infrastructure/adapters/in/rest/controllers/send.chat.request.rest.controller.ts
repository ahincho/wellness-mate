import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  AI_CHAT_V1_ENDPOINT,
  SEND_CHAT_REQUEST_DEFAULT_SERVICE,
} from '@common/constants/ai.constants';
import { SendChatRequestUseCase } from '@shared/ai/application/ports/in/send.chat.request.use.case';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import {
  ADMINISTRATOR_ROLE,
  DEFAULT_ROLE,
} from '@users/infrastructure/configurations/constants';
import { ChatSendRequest } from '../dtos/chat.send.request';
import { ChatSendResponse } from '../dtos/chat.send.response';
import { ChatRestMapper } from '../mappers/chat.rest.mapper';

@Controller(AI_CHAT_V1_ENDPOINT)
export class SendChatRequestRestController {
  constructor(
    @Inject(SEND_CHAT_REQUEST_DEFAULT_SERVICE)
    private readonly sendChatRequestUseCase: SendChatRequestUseCase,
  ) {}
  @Post()
  @HasAnyRole(DEFAULT_ROLE, ADMINISTRATOR_ROLE)
  @HttpCode(HttpStatus.CREATED)
  async sendChatRequest(
    @Body() chatSendRequest: ChatSendRequest,
  ): Promise<ChatSendResponse> {
    const chatRequest = ChatRestMapper.sendRequestToDomain(chatSendRequest);
    const chatResponse = await this.sendChatRequestUseCase.execute(chatRequest);
    return ChatRestMapper.domainToResponse(chatResponse);
  }
}
