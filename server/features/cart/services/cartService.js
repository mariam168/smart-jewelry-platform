
import Cart from "../models/Cart.js";
import Product from "../../catalog/models/Product.js";

// ==========================================
// POPULATE CART
// ==========================================

const populateCart = async (
  cart
) => {
  return cart.populate({
    path: "items.product",
    select:
      "name price images description",
  });
};

// ==========================================
// GET USER CART
// ==========================================

export const getUserCart = async (
  userId
) => {
  let cart =
    await Cart.findOne({
      user: userId,
    });

  // Create empty cart if user
  // does not have one
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  return populateCart(cart);
};

// ==========================================
// ADD PRODUCT TO CART
// ==========================================

export const addProductToCart =
  async (
    userId,
    productId,
    quantity = 1
  ) => {
    // Validate user
    if (!userId) {
      const error =
        new Error(
          "User ID is required"
        );

      error.statusCode = 401;

      throw error;
    }

    // Validate product ID
    if (!productId) {
      const error =
        new Error(
          "Product ID is required"
        );

      error.statusCode = 400;

      throw error;
    }

    // Validate quantity
    if (
      !Number.isInteger(
        quantity
      ) ||
      quantity < 1
    ) {
      const error =
        new Error(
          "Quantity must be at least 1"
        );

      error.statusCode = 400;

      throw error;
    }

    // Find product
    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      const error =
        new Error(
          "Product not found"
        );

      error.statusCode = 404;

      throw error;
    }

    // Find existing cart
    let cart =
      await Cart.findOne({
        user: userId,
      });

    // Create new cart
    if (!cart) {
      cart =
        await Cart.create({
          user: userId,
          items: [
            {
              product:
                productId,
              quantity,
            },
          ],
        });

      return populateCart(cart);
    }

    // Check if product
    // already exists
    const existingItem =
      cart.items.find(
        (item) =>
          item.product.toString() ===
          productId.toString()
      );

    if (existingItem) {
      existingItem.quantity +=
        quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    return populateCart(cart);
  };

// ==========================================
// UPDATE PRODUCT QUANTITY
// ==========================================

export const updateProductInCart =
  async (
    userId,
    productId,
    quantity
  ) => {
    if (!userId) {
      const error =
        new Error(
          "User ID is required"
        );

      error.statusCode = 401;

      throw error;
    }

    if (
      !Number.isInteger(
        quantity
      ) ||
      quantity < 1
    ) {
      const error =
        new Error(
          "Quantity must be at least 1"
        );

      error.statusCode = 400;

      throw error;
    }

    const cart =
      await Cart.findOne({
        user: userId,
      });

    if (!cart) {
      const error =
        new Error(
          "Cart not found"
        );

      error.statusCode = 404;

      throw error;
    }

    const item =
      cart.items.find(
        (cartItem) =>
          cartItem.product.toString() ===
          productId.toString()
      );

    if (!item) {
      const error =
        new Error(
          "Product is not in cart"
        );

      error.statusCode = 404;

      throw error;
    }

    item.quantity =
      quantity;

    await cart.save();

    return populateCart(cart);
  };

// ==========================================
// REMOVE PRODUCT FROM CART
// ==========================================

export const removeProductFromCart =
  async (
    userId,
    productId
  ) => {
    if (!userId) {
      const error =
        new Error(
          "User ID is required"
        );

      error.statusCode = 401;

      throw error;
    }

    const cart =
      await Cart.findOne({
        user: userId,
      });

    if (!cart) {
      const error =
        new Error(
          "Cart not found"
        );

      error.statusCode = 404;

      throw error;
    }

    cart.items =
      cart.items.filter(
        (item) =>
          item.product.toString() !==
          productId.toString()
      );

    await cart.save();

    return populateCart(cart);
  };

// ==========================================
// CLEAR USER CART
// ==========================================

export const clearUserCart =
  async (
    userId
  ) => {
    if (!userId) {
      const error =
        new Error(
          "User ID is required"
        );

      error.statusCode = 401;

      throw error;
    }

    const cart =
      await Cart.findOne({
        user: userId,
      });

    // If no cart exists,
    // return an empty cart
    if (!cart) {
      return {
        user: userId,
        items: [],
      };
    }

    cart.items = [];

    await cart.save();

    return populateCart(cart);
  };
