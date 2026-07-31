
import api from "../../../lib/axios";


// ==========================================
// CREATE ORDER
// ==========================================

export const createOrder =
  async (orderData) => {
    const response =
      await api.post(
        "/orders",
        orderData
      );

    return response.data;
  };


// ==========================================
// GET USER ORDERS
// ==========================================

export const getOrders =
  async () => {
    const response =
      await api.get(
        "/orders"
      );

    return response.data;
  };


// ==========================================
// GET SINGLE ORDER
// ==========================================

export const getOrder =
  async (orderId) => {
    const response =
      await api.get(
        `/orders/${orderId}`
      );

    return response.data;
  };
