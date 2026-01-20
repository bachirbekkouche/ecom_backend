import { BaseRepositoryInterface } from 'src/common/baseRepositoty.Interface';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUsersRepository extends BaseRepositoryInterface<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  findByEmail(email: string): Promise<User | null>;
}
