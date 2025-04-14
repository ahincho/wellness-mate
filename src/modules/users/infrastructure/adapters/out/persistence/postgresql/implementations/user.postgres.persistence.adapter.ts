import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfigService } from '@config/app/app.config.service';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { BCRYPT_PASSWORD_ENCODER } from '@common/constants/crypto.constants';
import { ModuleEnum } from '@common/enums/module.enum';
import { Optional } from '@common/models/optional';
import { DatabaseException } from '@common/exceptions/database.exception';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { PasswordEncoder } from '@shared/crypto/interfaces/password.encoder';
import { User } from '@users/domain/models/user';
import { RoleNotFoundException } from '@users/domain/exceptions/role.not.found.exception';
import { UserPersistencePort } from '@users/application/ports/out/user.persistence.port';
import {
  ADMINISTRATOR_ROLE,
  DEFAULT_ROLE,
} from '@users/infrastructure/configurations/constants';
import { UserTypeOrmMapper } from '../mappers/user.type.orm.mapper';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserPostgresPersistenceAdapter implements UserPersistencePort {
  constructor(
    private readonly appConfigService: AppConfigService,
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(BCRYPT_PASSWORD_ENCODER)
    private readonly passwordEncoder: PasswordEncoder,
    @Inject(DataSource)
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.initializeRoles();
    this.initializeAdminUser();
  }
  async createOneUser(user: User): Promise<User> {
    const userEntity = UserTypeOrmMapper.domainToEntity(user);
    try {
      return await this.dataSource.transaction(async (manager) => {
        const defaultRole = await manager.findOne(RoleEntity, {
          where: { name: DEFAULT_ROLE },
        });
        if (!defaultRole) {
          throw new RoleNotFoundException(DEFAULT_ROLE);
        }
        userEntity.roles = [defaultRole];
        const savedEntity = await manager.save(UserEntity, userEntity);
        const fullEntity = await manager.findOneOrFail(UserEntity, {
          where: { id: savedEntity.id },
          relations: ['roles'],
        });
        return UserTypeOrmMapper.entityToDomain(fullEntity);
      });
    } catch (error) {
      const exception = new DatabaseException(
        `Could not save user with email '${user.email}'`,
      );
      await this.createOneLogUseCase.execute(
        new Log({
          module: ModuleEnum.DATABASE,
          layer: Layer.INFRASTRUCTURE,
          level: Level.ERROR,
          message: exception.message,
        }),
      );
      throw exception;
    }
  }
  async findOneUser(userId: number): Promise<Optional<User>> {
    const userEntity = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!userEntity) {
      return Optional.empty<User>();
    }
    return Optional.of(UserTypeOrmMapper.entityToDomain(userEntity));
  }
  async findOneUserByEmail(userEmail: string): Promise<Optional<User>> {
    const userEntity = await this.userRepository.findOne({
      where: { email: userEmail },
      relations: ['roles'],
    });
    if (!userEntity) {
      return Optional.empty<User>();
    }
    return Optional.of(UserTypeOrmMapper.entityToDomain(userEntity));
  }
  async existsOneUserByEmail(userEmail: string): Promise<boolean> {
    const exists = await this.userRepository.exists({
      where: { email: userEmail },
    });
    return exists;
  }
  async initializeRoles(): Promise<void> {
    const rolesToCheck = [DEFAULT_ROLE, ADMINISTRATOR_ROLE];
    try {
      await this.dataSource.transaction(async (manager) => {
        for (const roleName of rolesToCheck) {
          const exists = await manager.findOne(RoleEntity, {
            where: { name: roleName },
          });
          if (!exists) {
            await manager.save(RoleEntity, new RoleEntity({ name: roleName }));
          }
        }
      });
    } catch (error) {
      const exception = new DatabaseException(
        'Something went wrong while initializing system roles',
      );
      await this.createOneLogUseCase.execute(
        new Log({
          module: ModuleEnum.DATABASE,
          layer: Layer.INFRASTRUCTURE,
          level: Level.ERROR,
          message: exception.message,
        }),
      );
      throw exception;
    }
  }
  async initializeAdminUser(): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        const email = this.appConfigService.defaultAdminUsername;
        const rawPassword = this.appConfigService.defaultAdminPassword;
        const existingUser = await manager.findOne(UserEntity, {
          where: { email },
        });
        if (existingUser) return;
        const adminRole = await manager.findOne(RoleEntity, {
          where: { name: ADMINISTRATOR_ROLE },
        });
        if (!adminRole) {
          throw new RoleNotFoundException(ADMINISTRATOR_ROLE);
        }
        const defaultRole = await manager.findOne(RoleEntity, {
          where: { name: DEFAULT_ROLE },
        });
        if (!defaultRole) {
          throw new RoleNotFoundException(DEFAULT_ROLE);
        }
        const encryptedPassword =
          await this.passwordEncoder.encode(rawPassword);
        const newUserEntity = new UserEntity({
          firstname: 'Administrator',
          lastname: 'Administrator',
          email,
          password: encryptedPassword,
          roles: [adminRole, defaultRole],
        });
        await manager.save(UserEntity, newUserEntity);
      });
    } catch (error) {
      const exception = new DatabaseException(
        'Failed to initialize default admin user',
      );
      await this.createOneLogUseCase.execute(
        new Log({
          module: ModuleEnum.DATABASE,
          layer: Layer.INFRASTRUCTURE,
          level: Level.ERROR,
          message: exception.message,
        }),
      );
      throw exception;
    }
  }
}
