
import {
  createOrder,
  getUserOrders,
  getUserOrderById,
} from "../services/orderService.js";


// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================

export const createOrderController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const {
        fullName,
        phone,
        address,
        city,
        paymentMethod,
      } = req.body;


      const order =
        await createOrder(
          req.user.userId,
          {
            fullName,
            phone,
            address,
            city,
            paymentMethod,
          }
        );


      return res.status(201).json({
        success: true,

        message:
          "Order created successfully",

        data: order,
      });
    } catch (error) {
      next(error);
    }
  };


// ==========================================
// GET USER ORDERS
// GET /api/orders
// ==========================================

export const getOrders =
  async (
    req,
    res,
    next
  ) => {
    try {
      const orders =
        await getUserOrders(
          req.user.userId
        );

      return res.status(200).json({
        success: true,

        data: orders,
      });
    } catch (error) {
      next(error);
    }
  };


// ==========================================
// GET SINGLE ORDER
// GET /api/orders/:id
// ==========================================

export const getOrder =
  async (
    req,
    res,
    next
  ) => {
    try {
      const order =
        await getUserOrderById(
          req.user.userId,
          req.params.id
        );

      return res.status(200).json({
        success: true,

        data: order,
      });
    } catch (error) {
      next(error);
    }
  };
