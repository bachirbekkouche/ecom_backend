// users.mapper.ts

import { User as PrismaUser } from '@prisma/client';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    const user = new User();
    user.id = prismaUser.id;
    user.email = prismaUser.email;
    user.name = prismaUser.name;
    user.username = prismaUser.username;
    user.phone = prismaUser.phone;
    user.photo = prismaUser.photo;
    user.createdAt = prismaUser.createdAt;
    user.updatedAt = prismaUser.updatedAt;

    return user;
  }

  static toPersistence(user: Partial<User>) {
    return {
      email: user.email,
      name: user.name,
      username: user.username,
      phone: user.phone,
      photo: user.photo,
    };
  }
}
