import { User as UserModel } from '../models/user.model';
import { User } from '../domain/user';

export class UserMapper {
  static toDomain(userModel: UserModel): User {
    return new User({
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
      password: userModel.password,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    });
  }
}
