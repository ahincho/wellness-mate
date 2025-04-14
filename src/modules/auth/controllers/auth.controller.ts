import { Body, Controller, Post } from '@nestjs/common';
import { AUTH_V1_ENDPOINT } from '@common/constants/auth.constants';
import { Public } from '@auth/decorators/public.decorator';
import { AuthService } from '@auth/services/auth.service';
import { LoginRequest } from '@auth/dtos/login.request';

@Controller(AUTH_V1_ENDPOINT)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @Public()
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
