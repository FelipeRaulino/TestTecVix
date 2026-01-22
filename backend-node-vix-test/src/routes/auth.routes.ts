import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";

const authRoutes = Router();

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.LOGIN;

export const makeAuthController = () => {
  return new AuthController();
};

const authController = makeAuthController();

authRoutes.post(BASE_PATH, async (req, res) => {
  await authController.login(req, res);
});

export { authRoutes };
