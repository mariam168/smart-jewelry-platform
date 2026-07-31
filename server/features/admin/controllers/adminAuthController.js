
import {
  adminLogin,
} from "../services/adminAuthService.js";


export const adminLoginController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        email,
        password,
      } = req.body;


      if (
        !email ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Email and password are required.",
        });
      }


      const result =
        await adminLogin(
          email,
          password
        );


      res.cookie(
        "accessToken",
        result.token,
        {
          httpOnly: true,

          secure:
            process.env.NODE_ENV ===
            "production",

          sameSite:
            process.env.NODE_ENV ===
            "production"
              ? "none"
              : "lax",

          maxAge:
            24 *
            60 *
            60 *
            1000,
        }
      );


      return res.status(200).json({
        success: true,

        message:
          "Admin login successful.",

        data: {
          user:
            result.user,
        },
      });

    } catch (error) {

      next(error);

    }
  };
