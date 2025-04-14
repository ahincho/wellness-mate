export interface PasswordEncoder {
  encode(password: string): Promise<string>;
  match(providedPassword: string, storedPassword: string): Promise<boolean>;
}
