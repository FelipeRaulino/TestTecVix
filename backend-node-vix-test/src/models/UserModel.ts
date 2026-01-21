import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";

export class UserModel {
  async getByUsername(username: string) {
    return prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async getByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async createNewUser(data: TUserCreated) {
    return prisma.user.create({
      data: { ...data },
    });
  }
}
