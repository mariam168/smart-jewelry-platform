
import express from "express";

import {
  protect,
} from "../../auth/middleware/authMiddleware.js";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";


const router = express.Router();


// ==========================================
// GET CART
// ==========================================

router.get(
  "/",
  protect,
  getCart
);


// ==========================================
// ADD TO CART
// ==========================================

router.post(
  "/items",
  protect,
  addToCart
);


// ==========================================
// UPDATE CART ITEM
// ==========================================

router.patch(
  "/items/:productId",
  protect,
  updateCartItem
);


// ==========================================
// REMOVE CART ITEM
// ==========================================

router.delete(
  "/items/:productId",
  protect,
  removeCartItem
);


// ==========================================
// CLEAR CART
// ==========================================

router.delete(
  "/",
  protect,
  clearCart
);


export default router;
