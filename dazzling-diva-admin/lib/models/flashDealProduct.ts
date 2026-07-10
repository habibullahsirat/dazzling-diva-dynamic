import mongoose, { Schema } from "mongoose";

const flashDealProductSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    originalPrice: {
      type: Number,
      required: true,
    },

    discountedPrice: {
      type: Number,
      required: true,
    },

    ctaText: {
      type: String,
      required: true,
      default: "Add to Cart",
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.FlashDealProduct;

export const FlashDealProduct =
  mongoose.models.FlashDealProduct ||
  mongoose.model("FlashDealProduct", flashDealProductSchema);
