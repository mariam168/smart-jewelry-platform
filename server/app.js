
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./features/auth/routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import orderRoutes from "./features/orders/routes/orderRoutes.js";
import homeRoutes from "./features/home/routes/homeRoutes.js";
import dashboardRoutes from "./features/admin/routes/dashboardRoutes.js";
import technologyRoutes
from "./features/catalog/routes/technologyRoutes.js";
import smartUnitRoutes
from "./features/catalog/routes/smartUnitRoutes.js";
import technologyModelRoutes
from "./features/catalog/routes/technologyModelRoutes.js";
import productTechnologyRoutes
from "./features/catalog/routes/productTechnologyRoutes.js";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./features/catalog/routes/productRoutes.js";
import categoryRoutes from "./features/catalog/routes/categoryRoutes.js";
import cartRoutes from "./features/cart/routes/cartRoutes.js";
import productVariantRoutes from "./features/catalog/routes/productVariantRoutes.js";
import productImageRoutes from "./features/catalog/routes/productImageRoutes.js";

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

app.use(
"/api/product-images",
productImageRoutes
);
app.use("/api/upload", uploadRoutes);

app.use(
"/api/technologies",
technologyRoutes
);
app.use(
"/api/technology-models",
technologyModelRoutes
);
app.use(
"/api/product-technologies",
productTechnologyRoutes
);
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);
// ==========================================
// ROOT ROUTE
// ==========================================
app.use(
    "/api/categories",
    categoryRoutes
);
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
app.use(
"/api/product-variants",
productVariantRoutes
);
app.use(
  "/api/smart-units",
  smartUnitRoutes
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
  "/api/admin",
  dashboardRoutes
);
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
// ERROR MIDDLEWARE
// ==========================================

app.use(
  errorMiddleware
);


export default app;
