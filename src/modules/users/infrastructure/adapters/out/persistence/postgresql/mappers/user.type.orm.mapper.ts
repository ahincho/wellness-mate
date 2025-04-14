import { User } from '@users/domain/models/user';
import { Role } from '@users/domain/models/role';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';

export class UserTypeOrmMapper {
  static domainToEntity(user: User): UserEntity {
    return new UserEntity({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      roles: user.roles?.map(
        (role) => new RoleEntity({ id: role.id, name: role.name }),
      ),
    });
  }
  static entityToDomain(userEntity: UserEntity): User {
    return new User({
      id: userEntity.id,
      firstname: userEntity.firstname,
      lastname: userEntity.lastname,
      email: userEntity.email,
      password: userEntity.password,
      roles: (userEntity.roles ?? []).map(
        (role) =>
          new Role({
            id: role.id,
            name: role.name,
          }),
      ),
    });
  }
}
