import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { UserRepository } from './domain/repositories/user.repository';
import { User } from './domain/user';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly usersRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findById(id);
  }

  async remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
