import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from '@config/jwt/jwt.config.module';
import { JwtConfigService } from '@config/jwt/jwt.config.service';
import { CryptoModule } from '@shared/crypto/configurations/crypto.module';
import { UserModule } from '@users/infrastructure/configurations/user.module';
import { AuthService } from '@auth/services/auth.service';
import { AuthHttpExceptionFilter } from '@auth/filters/auth.http.exception.filter';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { AuthController } from '@auth/controllers/auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtConfigModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useClass: JwtConfigService,
    }),
    UserModule,
    CryptoModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RoleGuard,
    {
      provide: APP_FILTER,
      useClass: AuthHttpExceptionFilter,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, JwtAuthGuard, RoleGuard],
})
export class AuthModule {}
