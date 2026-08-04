
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
// ==========================================
// Upload Image
// ==========================================

export const uploadImage = async (formData) => {

  const response = await axios.post(
    "http://localhost:5000/api/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return response.data;

};


// ==========================================
// Create Product Image
// ==========================================

export const createProductImage = async (imageData) => {

  const response = await axios.post(
    "http://localhost:5000/api/product-images",
    imageData,
    {
      withCredentials: true,
    }
  );

  return response.data;

};


// ==========================================
// Get Product Images
// ==========================================

export const getProductImages = async (productId) => {

  const response = await axios.get(
    `http://localhost:5000/api/product-images/product/${productId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;

};

// ==========================================
// Get Product Variants
// ==========================================

export const getProductVariants = async (productId) => {

  const response = await axios.get(

    `http://localhost:5000/api/product-variants/product/${productId}`,

    {

      withCredentials: true,

    }

  );

  return response.data;

};

// ==========================================
// Create Variant
// ==========================================

export const createVariant = async (variantData) => {

  const response = await axios.post(

    "http://localhost:5000/api/product-variants",

    variantData,

    {

      withCredentials: true,

    }

  );

  return response.data;

};

// ==========================================
// Update Variant
// ==========================================

export const updateVariant = async (id, variantData) => {

  const response = await axios.put(

    `http://localhost:5000/api/product-variants/${id}`,

    variantData,

    {

      withCredentials: true,

    }

  );

  return response.data;

};

// ==========================================
// Delete Variant
// ==========================================

export const deleteVariant = async (id) => {

  const response = await axios.delete(

    `http://localhost:5000/api/product-variants/${id}`,

    {

      withCredentials: true,

    }

  );

  return response.data;

};

// ==========================================
// Get Variant
// ==========================================

export const getVariant = async (variantId) => {

  const response = await axios.get(
    `http://localhost:5000/api/product-variants/${variantId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;

};
