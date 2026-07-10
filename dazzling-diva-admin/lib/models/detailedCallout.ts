import mongoose, { Schema } from "mongoose";

const ctaSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    href: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const cardSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    categoryName: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    cta: {
      type: ctaSchema,
    },
  },
  { _id: false },
);

const detailedCalloutSchema = new Schema(
  {
    // Left large banner
    featured: {
      type: cardSchema,
      required: true,
    },

    // Right 4 small banners
    items: {
      type: [cardSchema],
      required: true,
      validate: {
        validator: (value: unknown[]) => value.length === 4,
        message: "Exactly 4 items are required.",
      },
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.DetailedCalloutSection;

export const DetailedCalloutSection =
  mongoose.models.DetailedCalloutSection ||
  mongoose.model("DetailedCalloutSection", detailedCalloutSchema);
