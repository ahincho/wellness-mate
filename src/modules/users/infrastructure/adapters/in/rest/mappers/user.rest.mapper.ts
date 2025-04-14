import { User } from '@users/domain/models/user';
import { UserCreateRequest } from '../dtos/user.create.request';
import { UserResponse } from '../dtos/user.response';

export class UserRestMapper {
  static createRequestToDomain(userCreateRequest: UserCreateRequest): User {
    return new User({
      firstname: userCreateRequest.firstname,
      lastname: userCreateRequest.lastname,
      email: userCreateRequest.email,
      password: userCreateRequest.password,
    });
  }
  static domainToResponse(user: User): UserResponse {
    return new UserResponse({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: user.roles.map((role) => role.name),
    });
  }
}
