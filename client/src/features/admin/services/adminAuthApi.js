
import api from "../../../lib/axios";


export const adminLogin =
  async (
    loginData
  ) => {

    const response =
      await api.post(
        "/admin/auth/login",
        loginData,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };
