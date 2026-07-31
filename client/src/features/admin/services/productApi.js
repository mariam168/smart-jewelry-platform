
import axios from "axios";


const API_URL =
  "http://localhost:5000/api/products";


// Create Product

export const createProduct =
  async (productData) => {

    const response =
      await axios.post(
        API_URL,
        productData,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };


// Get Products

export const getProducts =
  async () => {

    const response =
      await axios.get(
        API_URL,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };


// Get Product

export const getProduct =
  async (productId) => {

    const response =
      await axios.get(
        `${API_URL}/${productId}`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };


// Update Product

export const updateProduct =
  async (
    productId,
    productData
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${productId}`,
        productData,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };


// Delete Product

export const deleteProduct =
  async (productId) => {

    const response =
      await axios.delete(
        `${API_URL}/${productId}`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };
