
import api from "../../../lib/axios";


// ==========================================
// Get Current User Cart
// ==========================================

export const getCart = async () => {
  const response = await api.get(
    "/cart"
  );

  return response.data;
};


// ==========================================
// Add Product To Cart
// ==========================================

export const addToCart = async (
  productId,
  quantity = 1
) => {
  const response = await api.post(
    "/cart/items",
    {
      productId,
      quantity,
    }
  );

  return response.data;
};


// ==========================================
// Update Cart Item Quantity
// ==========================================

export const updateCartItem = async (
  productId,
  quantity
) => {
  const response = await api.patch(
    `/cart/items/${productId}`,
    {
      quantity,
    }
  );

  return response.data;
};


// ==========================================
// Remove Product From Cart
// ==========================================

export const removeCartItem = async (
  productId
) => {
  const response = await api.delete(
    `/cart/items/${productId}`
  );

  return response.data;
};


// ==========================================
// Clear Entire Cart
// ==========================================

export const clearCart = async () => {
  const response = await api.delete(
    "/cart"
  );

  return response.data;
};