import {
  getDashboardStats,
} from "../services/dashboardService.js";


// ==========================================
// GET DASHBOARD STATS
// GET /api/admin/stats
// ==========================================

export const dashboardController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const stats =
        await getDashboardStats();


      return res.status(200).json({

        success: true,

        data: stats,

      });

    } catch (error) {

      next(error);

    }

  };