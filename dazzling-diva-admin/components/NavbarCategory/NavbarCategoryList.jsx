"use client";

import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function NavbarCategoryList({
  categories,
  fetchCategories,
  onEdit,
}) {
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/navbar-categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      await fetchCategories();

      toast.success("Category deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category.");
    }
  }

  if (categories.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        No navbar categories found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <div
          key={category._id}
          className="rounded-lg border bg-white p-5 shadow"
        >
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Category:</span>

              <p className="mt-1 text-lg font-bold">{category.name}</p>
            </div>

            <div>
              <span className="font-semibold">Navigation Link:</span>

              <a
                href={category.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block break-all text-blue-600 underline"
              >
                {category.href}
              </a>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => onEdit(category)}
                className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(category._id)}
                className="rounded bg-red-600 p-2 text-white hover:bg-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
