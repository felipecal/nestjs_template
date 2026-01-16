import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
