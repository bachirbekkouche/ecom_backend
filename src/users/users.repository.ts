import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUsersRepository } from './entities/IUsersRepository';
import { User } from './entities/user.entity';
import { UserMapper } from './entities/users.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const prismaUser = await this.prisma.user.create({ data });

    return UserMapper.toDomain(prismaUser);
  }

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map((user) => UserMapper.toDomain(user));
  }
  async findOne(id: number): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { id } });
    if (!prismaUser) return null;
    return UserMapper.toDomain(prismaUser);
  }
  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const prismaUser = await this.prisma.user.update({ where: { id }, data });
    return UserMapper.toDomain(prismaUser);
  }
  async remove(id: number): Promise<User> {
    const prismaUser = await this.prisma.user.delete({ where: { id } });
    return UserMapper.toDomain(prismaUser);
  }
  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { email } });
    if (!prismaUser) return null;
    return UserMapper.toDomain(prismaUser);
  }
}
