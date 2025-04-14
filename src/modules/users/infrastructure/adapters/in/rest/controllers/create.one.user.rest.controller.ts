import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  CREATE_ONE_USER_DEFAULT_SERVICE,
  USER_V1_ENDPOINT,
} from '@common/constants/users.constants';
import { ResourceCreatedInterceptor } from '@common/interceptors/resource.created.interceptor';
import { Public } from '@auth/decorators/public.decorator';
import { CreateOneUserUseCase } from '@users/application/ports/in/create.one.user.use.case';
import { UserRestMapper } from '../mappers/user.rest.mapper';
import { UserCreateRequest } from '../dtos/user.create.request';
import { UserResponse } from '../dtos/user.response';

@Controller(USER_V1_ENDPOINT)
export class CreateOneUserRestController {
  constructor(
    @Inject(CREATE_ONE_USER_DEFAULT_SERVICE)
    private readonly createOneUserUseCase: CreateOneUserUseCase,
  ) {}
  @Post()
  @Public()
  @UseInterceptors(ResourceCreatedInterceptor)
  async createOneUser(
    @Body() userCreateRequest: UserCreateRequest,
  ): Promise<UserResponse> {
    const user = UserRestMapper.createRequestToDomain(userCreateRequest);
    const savedUser = await this.createOneUserUseCase.execute(user);
    return UserRestMapper.domainToResponse(savedUser);
  }
}
