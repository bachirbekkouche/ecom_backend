import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUsersRepository } from './entities/IUsersRepository';
import { UserMapper } from './mappers/users.mapper';
import { UpdateUserModel } from './models/update-user.models';
import { CreateUserModel } from './models/create-user.models';
// import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}
  async findByEmailWithPassword(email: string) {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        username: true,
        phone: true,
        photo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!prismaUser) return null;
    return prismaUser;
  }

  async create(data: CreateUserModel) {
    const prismaUser = await this.prisma.user.create({ data });

    return UserMapper.toDomain(prismaUser);
  }

  async findAll() {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map((user) => UserMapper.toDomain(user));
  }
  async findOne(id: number) {
    const prismaUser = await this.prisma.user.findUnique({ where: { id } });
    if (!prismaUser) return null;
    return UserMapper.toDomain(prismaUser);
  }
  async update(id: number, data: UpdateUserModel) {
    const prismaUser = await this.prisma.user.update({ where: { id }, data });
    return UserMapper.toDomain(prismaUser);
  }
  async remove(id: number) {
    const prismaUser = await this.prisma.user.delete({ where: { id } });
    return UserMapper.toDomain(prismaUser);
  }
  async findByEmail(email: string) {
    const prismaUser = await this.prisma.user.findUnique({ where: { email } });
    if (!prismaUser) return null;
    return UserMapper.toDomain(prismaUser);
  }
}
