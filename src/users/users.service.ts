import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {type IUsersRepository } from './entities/IUsersRepository';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsersService {
  constructor( @Inject('IUsersRepository') private readonly usersRepo: IUsersRepository) {}

    async create(data: CreateUserDto) {
    data.password =await bcrypt.hashSync(data.password, 10);
    return this.usersRepo.create(data);
  }

  findAll() {
    return this.usersRepo.findAll();
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: number, data: UpdateUserDto) {
    return this.usersRepo.update(id, data);
  }

  remove(id: number) {
    return this.usersRepo.remove(id);
  }

}
