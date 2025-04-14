import { User } from '@users/domain/models/user';

export interface CreateOneUserUseCase {
  execute(user: User): Promise<User>;
}
