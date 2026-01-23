import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useZBrandInfo } from "../stores/useZBrandStore";
import { useNavigate } from "react-router-dom";
import { useZUserProfile } from "../stores/useZUserProfile";

export const useRegister = () => {
  const { t } = useTranslation();
  const { idBrand } = useZBrandInfo();
  const navigate = useNavigate();
  const { token } = useZUserProfile();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return t("loginRegister.invalidEmail");
    }
    return null;
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (!password) return t("loginRegister.invalidPassword");
    if (password !== confirmPassword) {
      return t("loginRegister.passwordMismatch");
    }
    return null;
  };
  const goRegister = async ({
    username,
    password,
    email,
    confirmPassword,
  }: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }) => {
    if (!username) {
      toast.error(t("loginRegister.invalidUsername"));
      return;
    }

    const emailError = validateEmail(email);
    const passwordError = validatePasswords(password, confirmPassword);
    if (emailError || passwordError) {
      toast.error(emailError || passwordError);
      return;
    }

    const payload = idBrand
      ? {
          username,
          password,
          email,
          idBrandMaster: idBrand,
        }
      : {
          username,
          password,
          email,
        };

    const response = await api.post({
      url: "/user",
      data: payload,
      auth: { Authorization: `Bearer ${token}` },
    });

    if (response.error) {
      toast.error(response.message);
      return;
    }
    return navigate("/login");
  };

  return { goRegister };
};
