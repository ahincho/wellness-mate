import { User } from '@users/domain/models/user';

export interface FindOneUserUseCase {
  execute(userId: number): Promise<User>;
}
