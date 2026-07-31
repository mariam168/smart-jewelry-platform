
import express from "express";

import {
  createOrderController,
  getOrders,
  getOrder,
} from "../controllers/orderController.js";

import {
  protect,
} from "../../auth/middleware/authMiddleware.js";

const router =
  express.Router();


// ==========================================
// CREATE ORDER
// ==========================================

router.post(
  "/",
  protect,
  createOrderController
);


// ==========================================
// GET USER ORDERS
// ==========================================

router.get(
  "/",
  protect,
  getOrders
);


// ==========================================
// GET SINGLE ORDER
// ==========================================

router.get(
  "/:id",
  protect,
  getOrder
);


export default router;
