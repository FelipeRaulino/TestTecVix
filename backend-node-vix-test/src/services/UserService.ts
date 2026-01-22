import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { UserModel } from "../models/UserModel";
import { userCreatedSchema } from "../types/validations/User/createUser";
import { userUpdatedSchema } from "../types/validations/User/updateUser";

export class UserService {
  constructor() {}

  private userModel = new UserModel();

  async getById(idUser: string) {
    return this.userModel.getById(idUser);
  }

  async getByUsername(username: string) {
    return await this.userModel.getByUsername(username);
  }

  async getByEmail(email: string) {
    return await this.userModel.getByEmail(email);
  }

  async createNewUser(data: unknown) {
    const validateData = userCreatedSchema.parse(data);

    if (
      !validateData.username ||
      !validateData.password ||
      !validateData.email
    ) {
      throw new AppError(ERROR_MESSAGE.INVALID_DATA, STATUS_CODE.BAD_REQUEST);
    }

    const usernameExists = await this.getByUsername(validateData.username);
    const emailExists = await this.getByEmail(validateData.email);

    if (usernameExists && usernameExists.isActive) {
      throw new AppError(
        ERROR_MESSAGE.USERNAME_ALREADY_EXISTS,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    if (emailExists && emailExists.isActive) {
      throw new AppError(
        ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    const createdUser = await this.userModel.createNewUser({
      ...validateData,
    });

    return createdUser;
  }

  async updateUser(idUser: string, data: unknown) {
    const validateData = userUpdatedSchema.parse(data);
    const oldUser = await this.getById(idUser);

    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedVM = await this.userModel.updateUser(idUser, validateData);
    return updatedVM;
  }

  async deleteUser(idUser: string) {
    const oldUser = await this.getById(idUser);
    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedVm = await this.userModel.deleteUser(idUser);
    return deletedVm;
  }
}
