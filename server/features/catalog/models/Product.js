import mongoose from "mongoose";

const productSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },

      // الصورة الرئيسية
      image: {
        type: String,
        default: "",
      },

      // معرض الصور
      images: [
        {
          type: String,
        },
      ],

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      comparePrice: {
        type: Number,
        default: 0,
      },

      stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      },

      sku: {
        type: String,
        default: "",
        trim: true,
      },

      material: {
        type: String,
        default: "",
      },

      color: {
        type: String,
        default: "",
      },

      weight: {
        type: Number,
        default: 0,
      },

      featured: {
        type: Boolean,
        default: false,
      },

      bestSeller: {
        type: Boolean,
        default: false,
      },
      primaryImage: {
  type: String,
  default: "",
},

      newArrival: {
        type: Boolean,
        default: false,
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
  

    {
      timestamps: true,
    }
  );

const Product =
  mongoose.model(
    "Product",
    productSchema
  );

export default Product;