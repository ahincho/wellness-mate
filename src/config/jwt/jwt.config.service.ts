import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('jwt.secret') || 'jwt-secret',
      signOptions: {
        expiresIn: this.configService.get<string>('jwt.expiresIn'),
      },
    };
  }
  get secret(): string {
    return this.configService.get<string>('jwt.secret') || 'jwt-secret';
  }
}
