import mongoose, { Schema } from "mongoose";

const flashDealSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    countdown: {
      type: Date,
      required: true,
    },

    discountAmount: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.FlashDeal;

export const FlashDeal =
  mongoose.models.FlashDeal || mongoose.model("FlashDeal", flashDealSchema);
