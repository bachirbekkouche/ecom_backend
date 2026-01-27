import { BaseRepositoryInterface } from 'src/common/baseRepository.Interface';
import { User } from './user.entity';
import { UpdateUserModel } from '../models/update-user.models';
import { CreateUserModel } from '../models/create-user.models';

export interface IUsersRepository extends BaseRepositoryInterface<
  User,
  CreateUserModel,
  UpdateUserModel
> {
  findByEmail(email: string): Promise<User | null>;
  findByEmailWithPassword(email: string): Promise<User | null>;
}
