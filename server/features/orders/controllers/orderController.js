
import {
  createOrder,
  getUserOrders,
  getUserOrderById,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
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
        shippingAddress,
        paymentMethod,
      } = req.body;


      const order =
        await createOrder(
          req.user.userId,
          {
            shippingAddress,
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
// GET MY ORDERS
// GET /api/orders/my-orders
// ==========================================

export const getMyOrders =
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
// GET MY ORDER BY ID
// GET /api/orders/my-orders/:id
// ==========================================

export const getMyOrderById =
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


// ==========================================
// ADMIN - GET ALL ORDERS
// GET /api/orders/admin
// ==========================================

export const getAdminOrders =
  async (
    req,
    res,
    next
  ) => {
    try {
      const orders =
        await getAllOrders();


      return res.status(200).json({
        success: true,

        data: orders,
      });

    } catch (error) {
      next(error);
    }
  };


// ==========================================
// ADMIN - GET ORDER BY ID
// GET /api/orders/admin/:id
// ==========================================

export const getAdminOrderById =
  async (
    req,
    res,
    next
  ) => {
    try {
      const order =
        await getOrderById(
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


// ==========================================
// ADMIN - UPDATE ORDER STATUS
// PATCH /api/orders/admin/:id/status
// ==========================================

export const updateAdminOrderStatus =
  async (
    req,
    res,
    next
  ) => {
    try {
      const {
        orderStatus,
      } = req.body;


      const order =
        await updateOrderStatus(
          req.params.id,
          orderStatus
        );


      return res.status(200).json({
        success: true,

        message:
          "Order status updated successfully",

        data: order,
      });

    } catch (error) {
      next(error);
    }
  };

