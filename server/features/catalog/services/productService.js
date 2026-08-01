
import Product from "../models/Product.js";

import Category from "../models/Category.js";


export const createProduct = async (productData) => {

  const category =
    await Category.findById(
      productData.category
    );

  if (!category) {
    const error = new Error(
      "Category not found."
    );

    error.statusCode = 404;

    throw error;
  }

  const product =
    await Product.create(
      productData
    );

  return product;
};


export const getAllProducts =
async()=>{

return await Product.find()

.populate("category")

.sort({
createdAt:-1
});

};

export const getProductById =
async(productId)=>{

return await Product.findById(productId)

.populate("category");

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
