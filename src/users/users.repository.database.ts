import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { User as UserModel } from './models/user.model';
import { User } from './domain/user';
import { UserMapper } from './mappers/user.mapper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './domain/repositories/user.repository';

@Injectable()
export class UserRepositoryDatabase implements UserRepository {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userModel: typeof UserModel,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userModel = await this.userModel.create(createUserDto as any);
    return UserMapper.toDomain(userModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await this.userModel.findOne({ where: { email } });
    return userModel ? UserMapper.toDomain(userModel) : null;
  }

  async findById(id: string): Promise<User | null> {
    const userModel = await this.userModel.findByPk(id);
    return userModel ? UserMapper.toDomain(userModel) : null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<[number]> {
    return this.userModel.update(updateUserDto as Partial<User>, {
      where: { id },
    });
  }

  async remove(id: string): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}
