
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./features/auth/routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import orderRoutes from "./features/orders/routes/orderRoutes.js";
import homeRoutes from "./features/home/routes/homeRoutes.js";

import adminAuthRoutes from "./features/admin/routes/adminRoutes.js";

import productRoutes from "./features/catalog/routes/productRoutes.js";

import cartRoutes from "./features/cart/routes/cartRoutes.js";


const app = express();


// ==========================================
// CORS CONFIGURATION
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


// ==========================================
// BODY PARSERS
// ==========================================

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ==========================================
// COOKIE PARSER
// ==========================================

app.use(
  cookieParser()
);


// ==========================================
// ROOT ROUTE
// ==========================================

app.get(
  "/",
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Smart Jewelry API is running",
    });
  }
);


// ==========================================
// PRODUCT ROUTES
// ==========================================

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);
// ==========================================
// AUTH ROUTES
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);


// ==========================================
// CART ROUTES
// ==========================================

app.use(
  "/api/cart",
  cartRoutes
);


// ==========================================
// HOME ROUTES
// ==========================================

app.use(
  "/api/home",
  homeRoutes
);


// ==========================================
// ADMIN AUTH ROUTES
// ==========================================

app.use(
  "/api/admin/auth",
  adminAuthRoutes
);


// ==========================================
// ERROR MIDDLEWARE
// ==========================================

app.use(
  errorMiddleware
);


export default app;
