import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateRequest {
  @IsString({ message: 'Firstname must be a string' })
  @IsNotEmpty({ message: 'Firstname is required' })
  @MinLength(8, { message: 'Firstname must be at least 8 characters long' })
  @MaxLength(32, { message: 'Firstname must be at most 32 characters long' })
  firstname: string;
  @IsString({ message: 'Lastname must be a string' })
  @IsNotEmpty({ message: 'Lastname is required' })
  @MinLength(8, { message: 'Lastname must be at least 8 characters long' })
  @MaxLength(32, { message: 'Lastname must be at most 32 characters long' })
  lastname: string;
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password must be at most 32 characters long' })
  password: string;
}
