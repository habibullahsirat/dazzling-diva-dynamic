import mongoose, { Schema } from "mongoose";

const navbarCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    href: {
      type: String,
      required: true,
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
