import { Router } from "express";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { BucketController } from "../controllers/BucketController";
import { BucketLocalService } from "../services/BucketLocalService";
import { authUser } from "../auth/authUser";
import multer from "multer";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.UPLOADS; // /api/v1/uploads

const uploadsRoutes = Router();

export const makeBucketController = () => {
  const service = new BucketLocalService();
  return new BucketController(service);
};

const uploadsController = makeBucketController();

const upload = multer({ storage: multer.memoryStorage() });

uploadsRoutes.get(`${BASE_PATH}/:objectName`, async (req, res) => {
  await uploadsController.getFileInBucketByObjectName(req, res);
});

uploadsRoutes.post(
  `${BASE_PATH}/file`,
  authUser,
  upload.single("file"),
  async (req, res) => {
    await uploadsController.uploadFile(req, res);
  },
);

export { uploadsRoutes };
