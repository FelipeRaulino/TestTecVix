import { Response } from "express";
import { UserService } from "../services/UserService";
import { CustomRequest } from "../types/custom";
import { STATUS_CODE } from "../constants/statusCode";

export class UserController {
  constructor() {}

  private userService = new UserService();

  async createUser(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.createNewUser(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }
}
