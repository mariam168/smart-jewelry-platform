import jwt from "jsonwebtoken";
import User from "../../auth/models/User.js";

const adminMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const token =
      req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const user =
      await User.findById(
        decoded.userId
      ).populate("role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    if (
      user.role?.name !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Admin access required.",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired authentication.",
    });
  }
};

export default adminMiddleware;