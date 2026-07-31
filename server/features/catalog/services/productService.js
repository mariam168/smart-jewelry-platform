
import Product from "../models/Product.js";


export const createProduct =
  async (productData) => {

    const product =
      await Product.create(
        productData
      );

    return product;
  };


export const getAllProducts =
  async () => {

    const products =
      await Product.find()
        .sort({
          createdAt: -1,
        });

    return products;
  };


export const getProductById =
  async (productId) => {

    const product =
      await Product.findById(
        productId
      );

    return product;
  };


export const updateProduct =
  async (
    productId,
    productData
  ) => {

    const product =
      await Product.findByIdAndUpdate(
        productId,

        productData,

        {
          new: true,
          runValidators: true,
        }
      );

    return product;
  };


export const deleteProduct =
  async (productId) => {

    const product =
      await Product.findByIdAndDelete(
        productId
      );

    return product;
  };
