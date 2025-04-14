import { Inject, Injectable } from '@nestjs/common';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { BCRYPT_PASSWORD_ENCODER } from '@common/constants/crypto.constants';
import { USER_POSTGRES_REPOSITORY } from '@common/constants/users.constants';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { PasswordEncoder } from '@shared/crypto/interfaces/password.encoder';
import { User } from '@users/domain/models/user';
import { UserDuplicationException } from '@users/domain/exceptions/user.duplication.exception';
import { CreateOneUserUseCase } from '../ports/in/create.one.user.use.case';
import { UserPersistencePort } from '../ports/out/user.persistence.port';

@Injectable()
export class CreateOneUserService implements CreateOneUserUseCase {
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(BCRYPT_PASSWORD_ENCODER)
    private readonly passwordEncoder: PasswordEncoder,
    @Inject(USER_POSTGRES_REPOSITORY)
    private readonly userPersistencePort: UserPersistencePort,
  ) {}
  async execute(user: User): Promise<User> {
    const existsByEmail = await this.userPersistencePort.existsOneUserByEmail(
      user.email,
    );
    if (existsByEmail) {
      const exception = new UserDuplicationException('email', user.email);
      await this.createOneLogUseCase.execute(
        new Log({
          module: exception.module,
          layer: Layer.APPLICATION,
          level: Level.ERROR,
          message: exception.message,
        }),
      );
      throw exception;
    }
    user.password = await this.passwordEncoder.encode(user.password);
    const savedUser = await this.userPersistencePort.createOneUser(user);
    return savedUser;
  }
}
