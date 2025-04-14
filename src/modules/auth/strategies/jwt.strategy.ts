import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtConfigService } from '@config/jwt/jwt.config.service';
import { FIND_ONE_USER_DEFAULT_SERVICE } from '@common/constants/users.constants';
import { FindOneUserUseCase } from '@users/application/ports/in/find.one.user.use.case';
import { JwtPayload } from '@auth/interfaces/jwt.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    jwtConfigService: JwtConfigService,
    @Inject(FIND_ONE_USER_DEFAULT_SERVICE)
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfigService.secret,
    });
  }
  async validate(payload: JwtPayload) {
    return await this.findOneUserUseCase.execute(payload.sub);
  }
}
