
import Order from "../models/Order.js";
import Cart from "../../cart/models/Cart.js";
import Product from "../../catalog/models/Product.js";


// ==========================================
// CREATE ORDER
// ==========================================

export const createOrder = async (
  userId,
  {
    fullName,
    phone,
    address,
    city,
    paymentMethod = "cash_on_delivery",
  }
) => {
  // ========================================
  // 1. GET USER CART
  // ========================================

  const cart = await Cart.findOne({
    user: userId,
  }).populate({
    path: "items.product",
    select: "name price images",
  });

  if (!cart || cart.items.length === 0) {
    const error = new Error(
      "Your cart is empty"
    );

    error.statusCode = 400;

    throw error;
  }


  // ========================================
  // 2. VALIDATE SHIPPING DATA
  // ========================================

  if (
    !fullName ||
    !phone ||
    !address ||
    !city
  ) {
    const error = new Error(
      "All shipping information is required"
    );

    error.statusCode = 400;

    throw error;
  }


  // ========================================
  // 3. PREPARE ORDER ITEMS
  // ========================================

  const orderItems = cart.items.map(
    (item) => {
      const product = item.product;

      return {
        product: product._id,

        name: product.name,

        price: product.price,

        quantity: item.quantity,

        image:
          product.images?.[0] || "",
      };
    }
  );


  // ========================================
  // 4. CALCULATE SUBTOTAL
  // ========================================

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


  // ========================================
  // 5. SHIPPING FEE
  // ========================================

  const shippingFee = 0;


  // ========================================
  // 6. TOTAL
  // ========================================

  const total =
    subtotal + shippingFee;


  // ========================================
  // 7. CREATE ORDER
  // ========================================

  const order =
    await Order.create({
      user: userId,

      items: orderItems,

      shippingAddress: {
        fullName,
        phone,
        address,
        city,
      },

      paymentMethod,

      subtotal,

      shippingFee,

      total,

      status: "pending",
    });


  // ========================================
  // 8. CLEAR CART
  // ========================================

  cart.items = [];

  await cart.save();


  // ========================================
  // 9. RETURN ORDER
  // ========================================

  return Order.findById(
    order._id
  ).populate({
    path: "items.product",
    select: "name price images",
  });
};


// ==========================================
// GET USER ORDERS
// ==========================================

export const getUserOrders =
  async (userId) => {
    return Order.find({
      user: userId,
    })
      .populate({
        path: "items.product",
        select: "name price images",
      })
      .sort({
        createdAt: -1,
      });
  };


// ==========================================
// GET SINGLE ORDER
// ==========================================

export const getUserOrderById =
  async (
    userId,
    orderId
  ) => {
    const order =
      await Order.findOne({
        _id: orderId,
        user: userId,
      }).populate({
        path: "items.product",
        select: "name price images",
      });

    if (!order) {
      const error = new Error(
        "Order not found"
      );

      error.statusCode = 404;

      throw error;
    }

    return order;
  };
