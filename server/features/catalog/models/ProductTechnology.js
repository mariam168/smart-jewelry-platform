import mongoose from "mongoose";

const productTechnologySchema =
  new mongoose.Schema(
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      technologyModel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TechnologyModel",
        required: true,
      },

      isDefault: {
        type: Boolean,
        default: false,
      },

      activationRequired: {
        type: Boolean,
        default: false,
      },

      subscriptionRequired: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "ProductTechnology",
  productTechnologySchema
);