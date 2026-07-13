import mongoose, { Schema } from "mongoose";

const navbarCategorySchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },

    // href: {
    //   type: String,
    //   required: true,
    // },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    href: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.NavbarCategory;

export const NavbarCategory =
  mongoose.models.NavbarCategory ||
  mongoose.model("NavbarCategory", navbarCategorySchema);
