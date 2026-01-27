import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type IUsersRepository } from './entities/IUsersRepository';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserModel } from './models/create-user.models';
import { UpdateUserModel } from './models/update-user.models';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly usersRepo: IUsersRepository,
  ) {}

  async create(data: CreateUserDto) {
    const model: CreateUserModel = await this.toCreateModel(data);

    return this.usersRepo.create(model);
  }

  findAll() {
    return this.usersRepo.findAll();
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const model = await this.toUpdateModel(data);
    return this.usersRepo.update(id, model);
  }

  remove(id: number) {
    return this.usersRepo.remove(id);
  }

  private async toCreateModel(dto: CreateUserDto): Promise<CreateUserModel> {
    return {
      email: dto.email,
      name: dto.name,
      username: dto.username,
      phone: dto.phone,
      photo: dto.photo,
      password: await bcrypt.hash(dto.password, 10),
    };
  }

  private async toUpdateModel(dto: UpdateUserDto): Promise<UpdateUserModel> {
    const model: UpdateUserModel = { ...dto };

    if (dto.password) {
      model.password = await bcrypt.hash(dto.password, 10);
    }

    return model;
  }
}
