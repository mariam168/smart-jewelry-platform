
import {
  getUserCart,
  addProductToCart,
  updateProductInCart,
  removeProductFromCart,
  clearUserCart,
} from "../services/cartService.js";

// ==========================================
// GET CART
// GET /api/cart
// ==========================================

export const getCart = async (
  req,
  res,
  next
) => {
  try {
    const userId =
      req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication data is missing",
      });
    }

    const cart =
      await getUserCart(userId);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADD TO CART
// POST /api/cart/items
// ==========================================

export const addToCart = async (
  req,
  res,
  next
) => {
  try {
    const userId =
      req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication data is missing",
      });
    }

    const {
      productId,
      quantity = 1,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message:
          "Product ID is required",
      });
    }

    const cart =
      await addProductToCart(
        userId,
        productId,
        Number(quantity)
      );

    return res.status(200).json({
      success: true,
      message:
        "Product added to cart successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE CART ITEM
// PATCH /api/cart/items/:productId
// ==========================================

export const updateCartItem = async (
  req,
  res,
  next
) => {
  try {
    const userId =
      req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication data is missing",
      });
    }

    const {
      productId,
    } = req.params;

    const {
      quantity,
    } = req.body;

    const parsedQuantity =
      Number(quantity);

    if (
      !Number.isInteger(
        parsedQuantity
      ) ||
      parsedQuantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity must be at least 1",
      });
    }

    const cart =
      await updateProductInCart(
        userId,
        productId,
        parsedQuantity
      );

    return res.status(200).json({
      success: true,
      message:
        "Cart item updated successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// REMOVE CART ITEM
// DELETE /api/cart/items/:productId
// ==========================================

export const removeCartItem = async (
  req,
  res,
  next
) => {
  try {
    const userId =
      req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication data is missing",
      });
    }

    const {
      productId,
    } = req.params;

    const cart =
      await removeProductFromCart(
        userId,
        productId
      );

    return res.status(200).json({
      success: true,
      message:
        "Product removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// CLEAR CART
// DELETE /api/cart
// ==========================================

export const clearCart = async (
  req,
  res,
  next
) => {
  try {
    const userId =
      req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication data is missing",
      });
    }

    const cart =
      await clearUserCart(userId);

    return res.status(200).json({
      success: true,
      message:
        "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
