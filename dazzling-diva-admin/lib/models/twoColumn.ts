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
  {
    _id: false,
  },
);

const columnSchema = new Schema(
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
  {
    _id: false,
  },
);

const twoColumnSectionSchema = new Schema(
  {
    left: {
      type: columnSchema,
      required: true,
    },

    right: {
      type: columnSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.TwoColumnSection;

export const TwoColumnSection =
  mongoose.models.TwoColumnSection ||
  mongoose.model("TwoColumnSection", twoColumnSectionSchema);
