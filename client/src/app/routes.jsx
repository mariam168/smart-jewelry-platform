
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
import CartPage
  from "../features/cart/pages/CartPage";

import CheckoutPage
  from "../features/checkout/pages/CheckoutPage";

import OrderSuccessPage
  from "../features/checkout/pages/OrderSuccessPage";

// ==========================================
// Router
// ==========================================

const router =
  createBrowserRouter([

    // ========================================
    // CUSTOMER WEBSITE
    // ========================================

    {
      element:
        <MainLayout />,

      children: [

        // Home
        {
          path: "/",

          element:
            <HomePage />,
        },


        // Home - Alternative URL
        {
          path: "/home",

          element:
            <HomePage />,
        },


        // Shop
        {
          path: "/shop",

          element:
            <ShopPage />,
        },
        {
  path: "/cart",
  element: <CartPage />,
},

{
  path: "/checkout",
  element: <CheckoutPage />,
},

{
  path: "/checkout/success/:id",
  element: <OrderSuccessPage />,
},
       

        // Product Details
        {
          path:
            "/shop/products/:id",

          element:
            <ProductDetailsPage />,
        },


        // Protected Customer Routes
        {
          element:
            <ProtectedRoute />,

          children: [

            {
              path: "/account",

              element:
                <AccountPage />,
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

      element:
        <RegisterPage />,
    },


    {
      path: "/login",

      element:
        <LoginPage />,
    },


    {
      path: "/verify-email",

      element:
        <VerifyEmailPage />,
    },


    // ========================================
    // ADMIN LOGIN
    // ========================================

    {
      path: "/admin/login",

      element:
        <AdminLoginPage />,
    },


    // ========================================
    // ADMIN DASHBOARD
    // ========================================

    {
      path: "/admin",

      element:
        <AdminLayout />,

      children: [

        // Dashboard
        {
          index: true,

          element:
            <AdminDashboardPage />,
        },


        // Products
        {
          path: "products",

          element:
            <AdminProductsPage />,
        },


        // Add Product
        {
          path: "products/new",

          element:
            <AddProductPage />,
        },

      ],
    },

  ]);


// ==========================================
// IMPORTANT
// ==========================================

export default router;
