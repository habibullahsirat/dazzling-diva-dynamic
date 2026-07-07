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

const heroSectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
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

delete mongoose.models.HeroSection;

export const HeroSection =
  mongoose.models.HeroSection ||
  mongoose.model("HeroSection", heroSectionSchema);
