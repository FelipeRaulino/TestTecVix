import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { isManagerOrIsAdmin } from "../auth/isManagerOrIsAdmin";
import { authUser } from "../auth/authUser";
import { AuthController } from "../controllers/AuthController";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER; //api/v1/user

const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

export const makeAuthController = () => {
  return new AuthController();
};

const userController = makeUserController();
const authController = makeAuthController();

// ========= GETs =========
userRoutes.get(BASE_PATH, authUser, async (req, res) => {
  await userController.listAll(req, res);
});

userRoutes.get(`${BASE_PATH}/token/:idUser`, authUser, async (req, res) => {
  await authController.refreshToken(req, res);
});

// ========= POSTs =========
userRoutes.post(BASE_PATH, authUser, isManagerOrIsAdmin, async (req, res) => {
  await userController.createUser(req, res);
});

// ======== PUTs =========
userRoutes.put(
  `${BASE_PATH}/:idUser`,
  authUser,
  isManagerOrIsAdmin,
  async (req, res) => {
    await userController.updateUser(req, res);
  },
);

// ======== DELETEs ========
userRoutes.delete(
  `${BASE_PATH}/:idUser`, //authUser,
  //isAdmin,
  async (req, res) => {
    await userController.deleteUser(req, res);
  },
);

export { userRoutes };
