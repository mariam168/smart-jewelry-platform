import api from "../../../lib/axios";

export const registerUser = async (
  registerData
) => {
  const response = await api.post(
    "/auth/register",
    registerData
  );

  return response.data;
};

export const loginUser = async (
  loginData
) => {
  const response = await api.post(
    "/auth/login",
    loginData
  );

  return response.data;
};

export const getCurrentUser =
  async () => {
    const response =
      await api.get(
        "/auth/me"
      );

    return response.data;
  };

export const logoutUser =
  async () => {
    const response =
      await api.post(
        "/auth/logout"
      );

    return response.data;
  };