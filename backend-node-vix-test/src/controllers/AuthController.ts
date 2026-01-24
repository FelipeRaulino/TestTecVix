import { Response } from "express";
import { AuthService } from "../services/AuthService";
import { CustomRequest } from "../types/custom";
import { user } from "@prisma/client";

export class AuthController {
  private authService = new AuthService();

  async refreshToken(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const { idUser: requesterId } = req.user as user;

    const result = await this.authService.refreshToken(
      idUser as string,
      requesterId,
    );

    return res.json(result);
  }

  async login(req: CustomRequest<unknown>, res: Response) {
    const result = await this.authService.login(req.body);
    return res.json(result);
  }
}
