import bcrypt from "bcryptjs";

import User from "../../auth/models/User.js";

import {
  generateAccessToken,
} from "../../auth/utils/jwt.js";

export const adminLogin = async (
  email,
  password
) => {
  const user =
    await User.findOne({
      email: email.toLowerCase(),
    })
      .select("+passwordHash")
      .populate("role");

  if (!user) {
    throw new Error(
      "Invalid email or password."
    );
  }

  if (!user.passwordHash) {
    throw new Error(
      "Admin account does not have a password hash."
    );
  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.passwordHash
    );

  if (!isPasswordValid) {
    throw new Error(
      "Invalid email or password."
    );
  }

  const roleName =
    user.role?.name?.toLowerCase();

  if (roleName !== "admin") {
    throw new Error(
      "Access denied. Admin account required."
    );
  }

  const token =
    generateAccessToken({
      userId: user._id.toString(),
      role: roleName,
    });

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: roleName,
    },

    token,
  };
};