// users.mapper.ts

import { User as PrismaUser } from '@prisma/client';
import { User } from './user.entity';

export class UserMapper {
  // تحويل من بريزما إلى الـ Entity الخاص بنا
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
    // هنا يمكننا التحكم: مثلاً لا نمرر كلمة المرور للـ Entity
    // أو نقوم بتحويل تواريخ معينة أو دمج حقول
    return user;
  }

  // تحويل من الـ DTO أو الـ Entity إلى شكل بريزما (عند الحفظ مثلاً)
  static toPersistence(user: Partial<User>) {
    return {
      email: user.email,
      name: user.name,
      // هنا نضع التنسيق الذي تفهمه قاعدة البيانات
    };
  }
}
