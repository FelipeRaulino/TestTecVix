import { prisma } from "../database/client";
import { IListAll } from "../types/IListAll";
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

  async totalCount({ query }: IListAll) {
    const { idBrandMaster } = query;

    return prisma.user.count({
      where: {
        deletedAt: null,
        idBrandMaster: !idBrandMaster ? undefined : Number(idBrandMaster),
        username: {
          contains: query.search,
        },
      },
    });
  }

  async listAll({ query }: IListAll) {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const { idBrandMaster } = query;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        idBrandMaster: !idBrandMaster ? undefined : Number(idBrandMaster),
        username: {
          contains: query.search,
        },
      },
      skip,
      take: limit || undefined,
      orderBy: orderBy.length
        ? orderBy
        : {
            updatedAt: "desc",
          },
      include: {
        brandMaster: {
          select: {
            brandName: true,
            brandLogo: true,
          },
        },
      },
    });

    const totalCount = await this.totalCount({
      query,
    });
    return { totalCount, result: users };
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
