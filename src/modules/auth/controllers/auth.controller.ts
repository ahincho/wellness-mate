import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AUTH } from '@common/constants/api.contants';
import { AUTH_V1_ENDPOINT } from '@common/constants/auth.constants';
import { Public } from '@auth/decorators/public.decorator';
import { AuthService } from '@auth/services/auth.service';
import { LoginRequest } from '@auth/dtos/login.request';

@Controller(AUTH_V1_ENDPOINT)
@ApiTags(AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @Public()
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticates a user and returns a JWT access token.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User authenticated successfully.',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  async login(
    @Body() loginRequest: LoginRequest,
  ): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(
      loginRequest.email,
      loginRequest.password,
    );
    return this.authService.login(user);
  }
}
