import mongoose, { Schema } from "mongoose";

const ctaSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    cta: {
      type: ctaSchema,
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.Category;

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
