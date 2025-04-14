import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CREATE_ONE_USER_DEFAULT_SERVICE,
  USER_V1_ENDPOINT,
} from '@common/constants/users.constants';
import { USERS } from '@common/constants/api.contants';
import { ResourceCreatedInterceptor } from '@common/interceptors/resource.created.interceptor';
import { Public } from '@auth/decorators/public.decorator';
import { CreateOneUserUseCase } from '@users/application/ports/in/create.one.user.use.case';
import { UserRestMapper } from '../mappers/user.rest.mapper';
import { UserCreateRequest } from '../dtos/user.create.request';
import { UserResponse } from '../dtos/user.response';

@ApiTags(USERS)
@ApiBearerAuth()
@Controller(USER_V1_ENDPOINT)
export class CreateOneUserRestController {
  constructor(
    @Inject(CREATE_ONE_USER_DEFAULT_SERVICE)
    private readonly createOneUserUseCase: CreateOneUserUseCase,
  ) {}
  @Post()
  @Public()
  @UseInterceptors(ResourceCreatedInterceptor)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
    type: UserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Validation failed.',
  })
  async createOneUser(
    @Body() userCreateRequest: UserCreateRequest,
  ): Promise<UserResponse> {
    const user = UserRestMapper.createRequestToDomain(userCreateRequest);
    const savedUser = await this.createOneUserUseCase.execute(user);
    return UserRestMapper.domainToResponse(savedUser);
  }
}
