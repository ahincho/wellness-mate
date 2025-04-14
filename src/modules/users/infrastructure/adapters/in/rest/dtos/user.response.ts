import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'Unique identifier of the user.',
    example: 1,
    type: Number,
  })
  id: number;
  @ApiProperty({
    description: 'Firstname of the user.',
    example: 'John',
    type: String,
  })
  firstname: string;
  @ApiProperty({
    description: 'Lastname of the user.',
    example: 'Doe',
    type: String,
  })
  lastname: string;
  @ApiProperty({
    description: 'Email address of the user.',
    example: 'john.doe@example.com',
    type: String,
  })
  email: string;
  @ApiProperty({
    description: 'List of roles assigned to the user.',
    example: ['admin', 'user'],
    type: [String],
  })
  roles: string[];
  constructor(partial?: Partial<UserResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
