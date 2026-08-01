
import mongoose from "mongoose";

import Order from "../models/Order.js";
import Cart from "../../cart/models/Cart.js";
import Product from "../../catalog/models/Product.js";

// ==========================================
// GENERATE ORDER NUMBER
// ==========================================

const generateOrderNumber = () => {
  const timestamp = Date.now();

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `SJ-${timestamp}-${random}`;
};

// ==========================================
// CREATE ORDER
// ==========================================

export const createOrder = async (
  userId,
  {
    shippingAddress,
    paymentMethod = "cash_on_delivery",
  }
) => {
  // Validate User ID
  if (
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    const error = new Error(
      "Invalid user ID"
    );

    error.statusCode = 400;

    throw error;
  }

  // ==========================================
  // GET USER CART
  // ==========================================

  const cart =
    await Cart.findOne({
      user: userId,
    }).populate({
      path: "items.product",
      select: "name price images",
    });

  if (
    !cart ||
    !cart.items ||
    cart.items.length === 0
  ) {
    const error = new Error(
      "Your cart is empty"
    );

    error.statusCode = 400;

    throw error;
  }

  // ==========================================
  // VALIDATE SHIPPING ADDRESS
  // ==========================================

  if (
    !shippingAddress ||
    !shippingAddress.firstName ||
    !shippingAddress.lastName ||
    !shippingAddress.phone ||
    !shippingAddress.address ||
    !shippingAddress.city
  ) {
    const error = new Error(
      "Complete shipping address is required"
    );

    error.statusCode = 400;

    throw error;
  }

  // ==========================================
  // VALIDATE PAYMENT METHOD
  // ==========================================

  const allowedPaymentMethods = [
    "cash_on_delivery",
    "card",
  ];

  if (
    !allowedPaymentMethods.includes(
      paymentMethod
    )
  ) {
    const error = new Error(
      "Invalid payment method"
    );

    error.statusCode = 400;

    throw error;
  }

  // ==========================================
  // PREPARE ORDER ITEMS
  // ==========================================

  const orderItems =
    cart.items.map((item) => {
      const product =
        item.product;

      if (!product) {
        throw new Error(
          "One of the products in your cart no longer exists"
        );
      }

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image:
          product.images?.[0] || "",
      };
    });

  // ==========================================
  // CALCULATE SUBTOTAL
  // ==========================================

  const subtotal =
    orderItems.reduce(
      (total, item) => {
        return (
          total +
          item.price *
            item.quantity
        );
      },
      0
    );

  // ==========================================
  // SHIPPING COST
  // ==========================================

  const shippingCost =
    subtotal >= 1000
      ? 0
      : 50;

  // ==========================================
  // TOTAL
  // ==========================================

  const total =
    subtotal +
    shippingCost;

  // ==========================================
  // CREATE ORDER
  // ==========================================

  const order =
    await Order.create({
      orderNumber:
        generateOrderNumber(),

      user: userId,

      items: orderItems,

      shippingAddress,

      paymentMethod,

      paymentStatus:
        "pending",

      orderStatus:
        "pending",

      subtotal,

      shippingCost,

      total,
    });

  // ==========================================
  // CLEAR CART
  // ==========================================

  cart.items = [];

  await cart.save();

  // ==========================================
  // RETURN POPULATED ORDER
  // ==========================================

  const populatedOrder =
    await Order.findById(
      order._id
    )
      .populate(
        "user",
        "email"
      )
      .populate(
        "items.product",
        "name price images"
      );

  return populatedOrder;
};

// ==========================================
// GET USER ORDERS
// ==========================================

export const getUserOrders =
  async (userId) => {
    const orders =
      await Order.find({
        user: userId,
      })
        .populate(
          "items.product",
          "name price images"
        )
        .sort({
          createdAt: -1,
        });

    return orders;
  };

// ==========================================
// GET USER ORDER BY ID
// ==========================================

export const getUserOrderById =
  async (
    userId,
    orderId
  ) => {
    if (
      !mongoose.Types.ObjectId.isValid(
        orderId
      )
    ) {
      const error = new Error(
        "Invalid order ID"
      );

      error.statusCode = 400;

      throw error;
    }

    const order =
      await Order.findOne({
        _id: orderId,
        user: userId,
      })
        .populate(
          "items.product",
          "name price images"
        );

    if (!order) {
      const error = new Error(
        "Order not found"
      );

      error.statusCode = 404;

      throw error;
    }

    return order;
  };

// ==========================================
// ADMIN - GET ALL ORDERS
// ==========================================

export const getAllOrders =
  async () => {
    const orders =
      await Order.find()
        .populate(
          "user",
          "email"
        )
        .populate(
          "items.product",
          "name price images"
        )
        .sort({
          createdAt: -1,
        });

    return orders;
  };

// ==========================================
// ADMIN - GET ORDER BY ID
// ==========================================

export const getOrderById =
  async (
    orderId
  ) => {
    if (
      !mongoose.Types.ObjectId.isValid(
        orderId
      )
    ) {
      const error = new Error(
        "Invalid order ID"
      );

      error.statusCode = 400;

      throw error;
    }

    const order =
      await Order.findById(
        orderId
      )
        .populate(
          "user",
          "email"
        )
        .populate(
          "items.product",
          "name price images"
        );

    if (!order) {
      const error = new Error(
        "Order not found"
      );

      error.statusCode = 404;

      throw error;
    }

    return order;
  };

// ==========================================
// ADMIN - UPDATE ORDER STATUS
// ==========================================

export const updateOrderStatus =
  async (
    orderId,
    orderStatus
  ) => {
    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (
      !allowedStatuses.includes(
        orderStatus
      )
    ) {
      const error = new Error(
        "Invalid order status"
      );

      error.statusCode = 400;

      throw error;
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        orderId
      )
    ) {
      const error = new Error(
        "Invalid order ID"
      );

      error.statusCode = 400;

      throw error;
    }

    const order =
      await Order.findByIdAndUpdate(
        orderId,
        {
          orderStatus,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          "user",
          "email"
        )
        .populate(
          "items.product",
          "name price images"
        );

    if (!order) {
      const error = new Error(
        "Order not found"
      );

      error.statusCode = 404;

      throw error;
    }

    return order;
  };

