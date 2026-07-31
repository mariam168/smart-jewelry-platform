
import bcrypt from "bcryptjs";

import User from "../../auth/models/User.js";


export const adminLogin = async (
  email,
  password
) => {

  // =========================================
  // 1. Find Admin User
  // =========================================

  const user =
    await User.findOne({
      email:
        email.toLowerCase(),
    })
      .select(
        "+passwordHash"
      )
      .populate(
        "role"
      );


  // =========================================
  // 2. Check if User Exists
  // =========================================

  if (!user) {
    throw new Error(
      "Invalid email or password."
    );
  }


  // =========================================
  // 3. Debug Information
  // Remove Later
  // =========================================

  console.log(
    "Admin User:",
    {
      id:
        user._id,

      email:
        user.email,

      passwordHash:
        user.passwordHash
          ? "EXISTS"
          : "MISSING",

      role:
        user.role,
    }
  );


  // =========================================
  // 4. Check Password Hash
  // =========================================

  if (
    !user.passwordHash
  ) {
    throw new Error(
      "Admin account does not have a password hash."
    );
  }


  // =========================================
  // 5. Compare Password
  // =========================================

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.passwordHash
    );


  if (
    !isPasswordValid
  ) {
    throw new Error(
      "Invalid email or password."
    );
  }


  // =========================================
  // 6. Check Admin Role
  // =========================================

  const roleName =
    user.role?.name;


  console.log(
    "Admin Role:",
    roleName
  );


  if (
    roleName !== "admin" &&
    roleName !== "Admin"
  ) {
    throw new Error(
      "Access denied. Admin account required."
    );
  }


  // =========================================
  // 7. Return Admin User
  // =========================================

  return {

    user: {

      id:
        user._id,

      firstName:
        user.firstName,

      lastName:
        user.lastName,

      email:
        user.email,

      role:
        roleName,

    },

    // =======================================
    // JWT Token
    // Will be added next
    // =======================================

    token:
      null,

  };
};

