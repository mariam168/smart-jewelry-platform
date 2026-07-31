
import axios from "axios";

const API_URL =
  "http://localhost:5000/api/products";


// ==========================================
// Get All Shop Products
// ==========================================

export const getShopProducts =
  async () => {

    const response =
      await axios.get(
        API_URL
      );

    return response.data;
  };


// ==========================================
// Get Single Product
// ==========================================

export const getShopProduct =
  async (productId) => {

    const response =
      await axios.get(
        `${API_URL}/${productId}`
      );

    return response.data;
  };

