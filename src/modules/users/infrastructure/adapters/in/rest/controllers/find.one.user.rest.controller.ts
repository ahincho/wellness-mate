import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import {
  FIND_ONE_USER_DEFAULT_SERVICE,
  USER_V1_ENDPOINT,
} from '@common/constants/users.constants';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { FindOneUserUseCase } from '@users/application/ports/in/find.one.user.use.case';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { UserRestMapper } from '../mappers/user.rest.mapper';
import { UserResponse } from '../dtos/user.response';

@Controller(USER_V1_ENDPOINT)
export class FindOneUserRestController {
  constructor(
    @Inject(FIND_ONE_USER_DEFAULT_SERVICE)
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}
  @Get(':userId')
  @HasAnyRole(ADMINISTRATOR_ROLE)
  async findOneUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserResponse> {
    const user = await this.findOneUserUseCase.execute(userId);
    return UserRestMapper.domainToResponse(user);
  }
}
