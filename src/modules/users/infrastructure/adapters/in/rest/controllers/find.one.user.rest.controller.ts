import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FIND_ONE_USER_DEFAULT_SERVICE,
  USER_V1_ENDPOINT,
} from '@common/constants/users.constants';
import { USERS } from '@common/constants/api.contants';
import { HasAnyRole } from '@auth/decorators/has.any.role.decorator';
import { FindOneUserUseCase } from '@users/application/ports/in/find.one.user.use.case';
import { ADMINISTRATOR_ROLE } from '@users/infrastructure/configurations/constants';
import { UserRestMapper } from '../mappers/user.rest.mapper';
import { UserResponse } from '../dtos/user.response';

@ApiTags(USERS)
@ApiBearerAuth()
@Controller(USER_V1_ENDPOINT)
export class FindOneUserRestController {
  constructor(
    @Inject(FIND_ONE_USER_DEFAULT_SERVICE)
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}
  @Get(':userId')
  @HasAnyRole(ADMINISTRATOR_ROLE)
  @ApiOperation({
    summary: 'Get a user by id',
    description:
      'Retrieve the details of a user by their id. Only accessible by users with the Administrator role.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User found successfully.',
    type: UserResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Forbidden. Only users with ADMINISTRATOR role can create histories.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async findOneUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserResponse> {
    const user = await this.findOneUserUseCase.execute(userId);
    return UserRestMapper.domainToResponse(user);
  }
}
