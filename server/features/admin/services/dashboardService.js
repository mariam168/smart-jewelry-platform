import Product from "../../catalog/models/Product.js";
import Order from "../../orders/models/Order.js";
import User from "../../auth/models/User.js";


// ==========================================
// GET ADMIN DASHBOARD STATS
// ==========================================

export const getDashboardStats =
  async () => {

    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      pendingOrders,
    ] = await Promise.all([

      // Total Products
      Product.countDocuments(),

      // Total Orders
      Order.countDocuments(),

      // Total Customers
      User.countDocuments(),

      // Pending Orders
      Order.countDocuments({
        orderStatus: "pending",
      }),

    ]);


    return {

      totalProducts,

      totalOrders,

      totalCustomers,

      pendingOrders,

    };

  };