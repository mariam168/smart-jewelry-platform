import express from "express";

import {
  createOrderController,
  getMyOrders,
  getMyOrderById,
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrderStatus,
} from "../controllers/orderController.js";

import {
  protect,
} from "../../auth/middleware/authMiddleware.js";

import adminMiddleware from "../../admin/middleware/adminMiddleware.js";


const router =
  express.Router();


// ==========================================
// CUSTOMER ROUTES
// ==========================================

// Create Order
router.post(
  "/",
  protect,
  createOrderController
);


// Get My Orders
router.get(
  "/my-orders",
  protect,
  getMyOrders
);


// Get My Order By ID
router.get(
  "/my-orders/:id",
  protect,
  getMyOrderById
);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Get All Orders
router.get(
  "/admin",
  protect,
  adminMiddleware,
  getAdminOrders
);


// Get Order By ID
router.get(
  "/admin/:id",
  protect,
  adminMiddleware,
  getAdminOrderById
);


// Update Order Status
router.patch(
  "/admin/:id/status",
  protect,
  adminMiddleware,
  updateAdminOrderStatus
);


export default router;