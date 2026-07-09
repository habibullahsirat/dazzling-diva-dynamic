import mongoose, { Schema } from "mongoose";

const newArrivalSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.NewArrival;

export const NewArrival =
  mongoose.models.NewArrival || mongoose.model("NewArrival", newArrivalSchema);
