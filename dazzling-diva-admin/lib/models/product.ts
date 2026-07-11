import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isFlashDeal: {
      type: Boolean,
      default: false,
    },

    isMostLoved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.Product;

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
