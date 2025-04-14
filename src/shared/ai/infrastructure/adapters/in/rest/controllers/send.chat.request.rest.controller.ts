import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AI_CHAT_V1_ENDPOINT,
  SEND_CHAT_REQUEST_DEFAULT_SERVICE,
} from '@common/constants/ai.constants';
import { CHATS } from '@common/constants/api.contants';
import { SendChatRequestUseCase } from '@shared/ai/application/ports/in/send.chat.request.use.case';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import {
  ADMINISTRATOR_ROLE,
  DEFAULT_ROLE,
} from '@users/infrastructure/configurations/constants';
import { ChatSendRequest } from '../dtos/chat.send.request';
import { ChatSendResponse } from '../dtos/chat.send.response';
import { ChatRestMapper } from '../mappers/chat.rest.mapper';

@ApiTags(CHATS)
@ApiBearerAuth()
@Controller(AI_CHAT_V1_ENDPOINT)
export class SendChatRequestRestController {
  constructor(
    @Inject(SEND_CHAT_REQUEST_DEFAULT_SERVICE)
    private readonly sendChatRequestUseCase: SendChatRequestUseCase,
  ) {}
  @Post()
  @HasAnyRole(DEFAULT_ROLE, ADMINISTRATOR_ROLE)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Send a chat request to the AI provider',
    description:
      'This endpoint sends a chat message to the AI provider and returns the AI response.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The AI response to the chat request',
    type: ChatSendResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request. The request body is invalid',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Forbidden. Only users with ADMINISTRATOR or CUSTOMER role can create histories.',
  })
  async sendChatRequest(
    @Body() chatSendRequest: ChatSendRequest,
  ): Promise<ChatSendResponse> {
    const chatRequest = ChatRestMapper.sendRequestToDomain(chatSendRequest);
    const chatResponse = await this.sendChatRequestUseCase.execute(chatRequest);
    return ChatRestMapper.domainToResponse(chatResponse);
  }
}
