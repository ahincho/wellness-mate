import { Optional } from '@common/models/optional';
import { User } from '@users/domain/models/user';

export interface UserPersistencePort {
  createOneUser(user: User): Promise<User>;
  findOneUser(userId: number): Promise<Optional<User>>;
  findOneUserByEmail(userEmail: string): Promise<Optional<User>>;
  existsOneUserByEmail(userEmail: string): Promise<boolean>;
}
