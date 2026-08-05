import mongoose from "mongoose";

const technologyModelSchema =
  new mongoose.Schema(
    {
      technology: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technology",
        required: true,
      },

      modelName: {
        type: String,
        required: true,
        trim: true,
      },

      modelCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
      },

      requiresBattery: {
        type: Boolean,
        default: false,
      },

      requiresActivation: {
        type: Boolean,
        default: false,
      },

      requiresSubscription: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "TechnologyModel",
  technologyModelSchema
);