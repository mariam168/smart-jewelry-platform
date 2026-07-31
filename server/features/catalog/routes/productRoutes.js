
import express from "express";

import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";


const router =
  express.Router();


// Get all products

router.get(
  "/",
  getProductsController
);


// Get single product

router.get(
  "/:id",
  getProductController
);


// Create product

router.post(
  "/",
  createProductController
);


// Update product

router.put(
  "/:id",
  updateProductController
);


// Delete product

router.delete(
  "/:id",
  deleteProductController
);


export default router;
