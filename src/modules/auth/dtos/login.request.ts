import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
    minLength: 1,
    maxLength: 32,
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @Length(1, 32, { message: 'Email must be between 1 and 32 characters' })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    example: 'MySecurePass123',
    description: 'Password of the user',
    minLength: 1,
    maxLength: 32,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(1, 32, { message: 'Password must be between 1 and 32 characters' })
  readonly password: string;
}
