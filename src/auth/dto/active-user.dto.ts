import { ApiProperty } from '@nestjs/swagger';

export class ActiveUserDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID',
  })
  userId: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;
}
