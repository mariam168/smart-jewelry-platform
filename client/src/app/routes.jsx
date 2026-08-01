import {
createBrowserRouter,
} from "react-router-dom";

// ==========================================
// Customer Layout
// ==========================================

import MainLayout
from "../components/layout/MainLayout";

// ==========================================
// Authentication
// ==========================================

import RegisterPage
from "../features/auth/pages/RegisterPage";

import VerifyEmailPage
from "../features/auth/pages/VerifyEmailPage";

import LoginPage
from "../features/auth/pages/LoginPage";

import ProtectedRoute
from "../features/auth/components/ProtectedRoute";

// ==========================================
// Account
// ==========================================

import AccountPage
from "../features/account/pages/AccountPage";

import MyOrdersPage
from "../features/orders/pages/MyOrdersPage";

import OrderDetailsPage
from "../features/orders/pages/OrderDetailsPage";

import OrderSuccessPage
from "../features/orders/pages/OrderSuccessPage";

// ==========================================
// Home
// ==========================================

import HomePage
from "../features/home/pages/HomePage";

// ==========================================
// Shop
// ==========================================

import ShopPage
from "../features/shop/pages/ShopPage";

import ProductDetailsPage
from "../features/shop/pages/ProductDetailsPage";

// ==========================================
// Cart & Checkout
// ==========================================

import CartPage
from "../features/cart/pages/CartPage";

import CheckoutPage
from "../features/checkout/pages/CheckoutPage";

// ==========================================
// Admin
// ==========================================

import AdminLoginPage
from "../features/admin/pages/AdminLoginPage";

import AdminLayout
from "../features/admin/components/AdminLayout";

import AdminDashboardPage
from "../features/admin/pages/AdminDashboardPage";

import AdminProductsPage
from "../features/admin/pages/AdminProductsPage";

import AddProductPage
from "../features/admin/pages/AddProductPage";

import AdminOrdersPage
from "../features/admin/pages/AdminOrdersPage";

import AdminOrderDetailsPage
from "../features/admin/pages/AdminOrderDetailsPage";

// ==========================================
// Router
// ==========================================

const router =
createBrowserRouter([
// ========================================
// CUSTOMER WEBSITE
// ========================================


{
  element: <MainLayout />,

  children: [
    // ======================================
    // HOME
    // ======================================

    {
      path: "/",
      element: <HomePage />,
    },

    {
      path: "/home",
      element: <HomePage />,
    },

    // ======================================
    // SHOP
    // ======================================

    {
      path: "/shop",
      element: <ShopPage />,
    },

    {
      path: "/shop/products/:id",
      element: <ProductDetailsPage />,
    },

    // ======================================
    // CART
    // ======================================

    {
      path: "/cart",
      element: <CartPage />,
    },

    // ======================================
    // CHECKOUT
    // ======================================

    {
      path: "/checkout",
      element: <CheckoutPage />,
    },

    // ======================================
    // ORDER SUCCESS
    // ======================================

    {
      path: "/order-success/:orderId",
      element: <OrderSuccessPage />,
    },

    // ======================================
    // PROTECTED CUSTOMER ROUTES
    // ======================================

    {
      element: <ProtectedRoute />,

      children: [
        // Account
        {
          path: "/account",
          element: <AccountPage />,
        },

        // My Orders
        {
          path: "/account/orders",
          element: <MyOrdersPage />,
        },

        // Order Details
        {
          path: "/account/orders/:id",
          element: <OrderDetailsPage />,
        },
      ],
    },
  ],
},

// ========================================
// CUSTOMER AUTH
// ========================================

{
  path: "/register",
  element: <RegisterPage />,
},

{
  path: "/login",
  element: <LoginPage />,
},

{
  path: "/verify-email",
  element: <VerifyEmailPage />,
},

// ========================================
// ADMIN LOGIN
// ========================================

{
  path: "/admin/login",
  element: <AdminLoginPage />,
},

// ========================================
// ADMIN DASHBOARD
// ========================================

{
  path: "/admin",

  element: <AdminLayout />,

  children: [
    // Dashboard
    {
      index: true,
      element: <AdminDashboardPage />,
    },

    // Products
    {
      path: "products",
      element: <AdminProductsPage />,
    },

    // Add Product
    {
      path: "products/new",
      element: <AddProductPage />,
    },

    // Orders
    {
      path: "orders",
      element: <AdminOrdersPage />,
    },

    // Order Details
    {
      path: "orders/:id",
      element: <AdminOrderDetailsPage />,
    },
  ],
},


]);

export default router;
