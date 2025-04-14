import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER_POSTGRES_REPOSITORY } from '@common/constants/users.constants';
import { BCRYPT_PASSWORD_ENCODER } from '@common/constants/crypto.constants';
import { PasswordEncoder } from '@shared/crypto/interfaces/password.encoder';
import { User } from '@users/domain/models/user';
import { UserPersistencePort } from '@users/application/ports/out/user.persistence.port';
import { AuthException } from '@auth/exceptions/auth.exception';
import { CredentialException } from '@auth/exceptions/credential.exception';
import { JwtPayload } from '@auth/interfaces/jwt.payload';
import { JwtDto } from '@auth/interfaces/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_POSTGRES_REPOSITORY)
    private userPersistencePort: UserPersistencePort,
    @Inject(BCRYPT_PASSWORD_ENCODER)
    private passwordEncoder: PasswordEncoder,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const optionalUser =
      await this.userPersistencePort.findOneUserByEmail(email);
    if (optionalUser.isEmpty()) {
      throw new AuthException(
        `Could not create session for user with email '${email}'`,
      );
    }
    const user = optionalUser.get();
    const isPasswordValid = await this.passwordEncoder.match(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new CredentialException(
        'Invalid credentials. Email or password are wrong',
      );
    }
    return user;
  }
  login(user: User): JwtDto {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.email,
      roles: user.roles.map((role) => role.name),
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
