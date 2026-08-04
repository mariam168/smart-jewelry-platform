import {
createBrowserRouter,
} from "react-router-dom";

// ==========================================
// Customer Layout
// ==========================================

import MainLayout
from "../components/layout/MainLayout";
import AdminCategoriesPage
from "../features/admin/pages/AdminCategoriesPage";

import AddCategoryPage
from "../features/admin/pages/AddCategoryPage";

import EditCategoryPage
from "../features/admin/pages/EditCategoryPage";

// ==========================================
// Authentication
// ==========================================

import RegisterPage
from "../features/auth/pages/RegisterPage";

import VerifyEmailPage
from "../features/auth/pages/VerifyEmailPage";
import AdminProductVariantsPage
from "../features/admin/pages/AdminProductVariantsPage";
import AddVariantPage
from "../features/admin/pages/AddVariantPage";
import LoginPage
from "../features/auth/pages/LoginPage";

import ProtectedRoute
from "../features/auth/components/ProtectedRoute";

// ==========================================
// Account
// ==========================================

import AccountPage
from "../features/account/pages/AccountPage";
import EditVariantPage from "../features/admin/pages/EditVariantPage";
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
import EditProductPage from "../features/admin/pages/EditProductPage";
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
{ path:"/admin/variants/:id/edit",
  element:<EditVariantPage />},

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
    {
  path:"/admin/products/:id/variants",
  element:<AdminProductVariantsPage />,

  },
  {
    path:"/admin/products/:id/variants",
     element:<AdminProductVariantsPage />,
    } ,
   { 
    path:"/admin/products/:id/variants/new" ,
    element:<AddVariantPage />,

    } ,


    // Add Product
    {
      path: "products/new",
      element: <AddProductPage />,
    },
    {
  path: "/admin/products/:id/edit",
  element:<EditProductPage />,

  },
{
  path: "categories",
  element: <AdminCategoriesPage />,
},
{
  path: "categories/new",
  element: <AddCategoryPage />,
},

{
  path: "categories/:id/edit",
  element: <EditCategoryPage />,
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
