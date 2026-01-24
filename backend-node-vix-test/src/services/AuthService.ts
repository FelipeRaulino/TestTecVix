import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { UserModel } from "../models/UserModel";
import { loginSchema, TLoginSchema } from "../types/validations/Auth/login";
import { genToken } from "../utils/jwt";
import bcrypt from "bcryptjs";

export class AuthService {
  private userModel = new UserModel();

  async refreshToken(idUser: string, requesterId: string) {
    if (idUser !== requesterId) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const user = await this.userModel.getById(idUser);

    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const token = genToken({
      idUser: user.idUser,
      role: user.role,
    });

    return { token };
  }

  async login(data: TLoginSchema) {
    const validateData = loginSchema.parse(data);

    if (!validateData.email || !validateData.password) {
      throw new AppError(ERROR_MESSAGE.INVALID_DATA, STATUS_CODE.BAD_REQUEST);
    }

    const { email, password } = data;

    const user = await this.userModel.getByEmail(email);

    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const token = genToken({
      idUser: user.idUser,
      role: user.role,
    });

    const updatedUser = await this.userModel.updateUser(user.idUser, {
      lastLoginDate: new Date(),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = updatedUser;

    return {
      user: safeUser,
      token,
    };
  }
}
