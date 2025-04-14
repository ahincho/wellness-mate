import { Injectable } from '@nestjs/common';
import { PasswordEncoder } from '../interfaces/password.encoder';
import { hash, compare } from 'bcrypt';

@Injectable()
export class BcryptPasswordEncoder implements PasswordEncoder {
  private readonly saltRounds = 10;
  async encode(password: string): Promise<string> {
    const hashedPassword = await hash(password, this.saltRounds);
    return hashedPassword;
  }
  async match(
    providedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const isMatch = await compare(providedPassword, storedPassword);
    return isMatch;
  }
}
