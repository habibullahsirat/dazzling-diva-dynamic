"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProductList({ products, fetchProducts, onEdit }) {
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      await fetchProducts();

      toast.success("Product deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  }

  if (products.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">No products found.</p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <div
          key={product._id}
          className="border-gray-300 overflow-hidden rounded-lg border bg-white shadow"
        >
          <div className="relative h-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-3 p-4">
            <h2 className="text-xl font-bold">{product.title}</h2>

            <p className="text-lg font-semibold text-green-600">
              ৳ {product.price}
            </p>

            <div className="flex flex-wrap gap-2">
              {product.isNewArrival && (
                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  New Arrival
                </span>
              )}

              {product.isFlashDeal && (
                <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                  Flash Deal
                </span>
              )}

              {product.isMostLoved && (
                <span className="rounded bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">
                  Most Loved
                </span>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => onEdit(product)}
                className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(product._id)}
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
