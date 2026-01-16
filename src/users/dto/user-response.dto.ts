import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User UUID',
  })
  id: string;

  @Expose()
  @ApiProperty({ example: 'John Doe', description: 'User Name' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'john@example.com', description: 'User Email' })
  email: string;

  @Expose()
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'User Created At',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'User Updated At',
  })
  updatedAt: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
