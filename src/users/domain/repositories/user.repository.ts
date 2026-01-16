import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../user';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<[number]>;
  remove(id: string): Promise<number>;
}
