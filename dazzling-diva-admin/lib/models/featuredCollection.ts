import mongoose, { Schema } from "mongoose";

const featuredCollectionSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const FeaturedCollection =
  mongoose.models.FeaturedCollection ||
  mongoose.model("FeaturedCollection", featuredCollectionSchema);
