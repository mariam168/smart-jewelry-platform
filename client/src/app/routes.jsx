import {
  createBrowserRouter,
} from "react-router-dom";

import RegisterPage from "../features/auth/pages/RegisterPage";

import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";

import LoginPage from "../features/auth/pages/LoginPage";

import ProtectedRoute from "../features/auth/components/ProtectedRoute";

import AccountPage from "../features/account/pages/AccountPage";

const router =
  createBrowserRouter([
    {
      path: "/",

      element: (
        <div>
          Smart Jewelry Platform
        </div>
      ),
    },

    {
      path: "/register",

      element:
        <RegisterPage />,
    },

    {
      path: "/verify-email",

      element:
        <VerifyEmailPage />,
    },

    {
      path: "/login",

      element:
        <LoginPage />,
    },

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
  ]);

export default router;