import api from "../../../lib/axios";


// ==========================================
// GET ADMIN DASHBOARD STATS
// ==========================================

export const getDashboardStats =
  async () => {

    const response =
      await api.get(
        "/admin/stats"
      );

    return response.data;

  };