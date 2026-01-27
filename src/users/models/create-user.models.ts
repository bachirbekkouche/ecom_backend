// src/users/models/create-user.model.ts

export type CreateUserModel = {
  email?: string;
  password: string;
  name: string;
  username: string;
  phone?: string;
  photo?: string;
};
