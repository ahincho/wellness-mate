import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateRequest {
  @ApiProperty({
    description: 'Firstname of the user.',
    example: 'John',
    minLength: 8,
    maxLength: 32,
    type: String,
  })
  @IsString({ message: 'Firstname must be a string' })
  @IsNotEmpty({ message: 'Firstname is required' })
  @MinLength(8, { message: 'Firstname must be at least 8 characters long' })
  @MaxLength(32, { message: 'Firstname must be at most 32 characters long' })
  firstname: string;
  @ApiProperty({
    description: 'Lastname of the user.',
    example: 'Doe',
    minLength: 8,
    maxLength: 32,
    type: String,
  })
  @IsString({ message: 'Lastname must be a string' })
  @IsNotEmpty({ message: 'Lastname is required' })
  @MinLength(8, { message: 'Lastname must be at least 8 characters long' })
  @MaxLength(32, { message: 'Lastname must be at most 32 characters long' })
  lastname: string;
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
    type: String,
  })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
  @ApiProperty({
    description: 'Password for the user account.',
    example: 'SecurePassword123',
    minLength: 8,
    maxLength: 32,
    type: String,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password must be at most 32 characters long' })
  password: string;
}
