import { user, vM } from "@prisma/client";
import { VMModel } from "../models/VMModel";
import { TVMCreate, vMCreatedSchema } from "../types/validations/VM/createVM";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { TVMUpdate, vMUpdatedSchema } from "../types/validations/VM/updateVM";
import { vmListAllSchema } from "../types/validations/VM/vmListAll";
import bcrypt from "bcryptjs";

export class VMService {
  constructor() {}

  private vMModel = new VMModel();

  async getById(idVM: number) {
    return this.vMModel.getById(idVM);
  }

  async listAll(query: unknown, user: user) {
    const validQuery = vmListAllSchema.parse(query);
    return this.vMModel.listAll({
      query: validQuery,
    });
  }

  async createNewVM(data: unknown, user: user) {
    const validateData = vMCreatedSchema.parse(data);

    const encriptedPassword = await bcrypt.hash(validateData.pass, 10);

    const createdVM = await this.vMModel.createNewVM({
      ...validateData,
      status: "RUNNING",
      pass: encriptedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pass: _, ...safeVM } = createdVM;

    return safeVM;
  }

  async updateVM(idVM: number, data: unknown, user: user) {
    const validateDataSchema = vMUpdatedSchema.parse(data);
    const oldVM = await this.getById(idVM);

    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (validateDataSchema.pass) {
      const encriptedPassword = await bcrypt.hash(validateDataSchema.pass, 10);
      const updatedVM = await this.vMModel.updateVM(idVM, {
        ...validateDataSchema,
        pass: encriptedPassword,
      });
      return updatedVM;
    } else {
      const updatedVM = await this.vMModel.updateVM(idVM, validateDataSchema);
      return updatedVM;
    }
  }

  async deleteVM(idVM: number, user: user) {
    const oldVM = await this.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedVm = await this.vMModel.deleteVM(idVM);
    return deletedVm;
  }
}
