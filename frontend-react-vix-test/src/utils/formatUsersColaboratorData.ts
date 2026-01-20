import { Colaborator } from "../stores/useZColaboratorRegister";

interface IUser {
  idUser?: string;
  username: string;
  email: string | null;
  profileImgUrl: string | null;
  role: "admin" | "manager" | "member";
  isActive: boolean;
  lastLoginDate: string | Date | null;
  brandMaster?: { brandName: string } | null;
  idBrandMaster?: number | null;
}
export const formatUsersColaboratorData = (
  data: IUser[],
): Colaborator[] => {
  return data.map((user) => ({
    idUser: user.idUser || "",
    name: user.username || "",
    username: user.username || "",
    email: user.email || "",
    permission: user.role,
    status: user.isActive ? "active" : "inactive",
    lastActivity: user.lastLoginDate || "",
    idBrandMaster: user.idBrandMaster || null,
    profileImgUrl: user.profileImgUrl || "",
  }));
};
