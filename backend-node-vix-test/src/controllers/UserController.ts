import { Response } from "express";
import { UserService } from "../services/UserService";
import { CustomRequest } from "../types/custom";
import { STATUS_CODE } from "../constants/statusCode";
/* import { user } from "@prisma/client"; */

export class UserController {
  constructor() {}

  private userService = new UserService();

  async createUser(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.createNewUser(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    /* const user = req.user as user; */
    const result = await this.userService.updateUser(
      idUser as string,
      req.body,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    /* const user = req.user as user; */
    const result = await this.userService.deleteUser(idUser as string);
    return res.status(STATUS_CODE.OK).json(result);
  }
}
