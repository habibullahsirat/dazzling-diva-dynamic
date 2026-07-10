import mongoose, { Schema } from "mongoose";

const calloutSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    cta: {
      text: {
        type: String,
        required: true,
      },

      href: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.Callout;

export const Callout =
  mongoose.models.Callout || mongoose.model("Callout", calloutSchema);
