import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserUpdated } from "../types/validations/User/updateUser";

export class UserModel {
  async getById(idUser: string) {
    return await prisma.user.findUnique({
      where: { idUser },
    });
  }

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

  async updateUser(idUser: string, data: TUserUpdated) {
    return await prisma.user.update({
      where: { idUser },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteUser(idUser: string) {
    return await prisma.user.update({
      where: { idUser },
      data: { isActive: false, updatedAt: new Date(), deletedAt: new Date() },
    });
  }
}
