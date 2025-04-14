import { Inject, Injectable } from '@nestjs/common';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { USER_POSTGRES_REPOSITORY } from '@common/constants/users.constants';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { User } from '@users/domain/models/user';
import { UserNotFoundException } from '@users/domain/exceptions/user.not.found.exception';
import { FindOneUserUseCase } from '../ports/in/find.one.user.use.case';
import { UserPersistencePort } from '../ports/out/user.persistence.port';

@Injectable()
export class FindOneUserService implements FindOneUserUseCase {
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(USER_POSTGRES_REPOSITORY)
    private readonly userPersistencePort: UserPersistencePort,
  ) {}
  async execute(userId: number): Promise<User> {
    const optionalUser = await this.userPersistencePort.findOneUser(userId);
    if (optionalUser.isEmpty()) {
      const exception = new UserNotFoundException(userId);
      await this.createOneLogUseCase.execute(
        new Log({
          module: exception.module,
          layer: Layer.APPLICATION,
          level: Level.WARNING,
          message: exception.message,
        }),
      );
      throw exception;
    }
    return optionalUser.get();
  }
}
