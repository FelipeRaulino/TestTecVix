import { Response } from "express";
import { AuthService } from "../services/AuthService";
import { CustomRequest } from "../types/custom";

export class AuthController {
  private authService = new AuthService();

  async login(req: CustomRequest<unknown>, res: Response) {
    const result = await this.authService.login(req.body);
    return res.json(result);
  }
}
