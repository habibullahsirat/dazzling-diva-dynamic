"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function FlashDealProductList({
  products,
  fetchProducts,
  onEdit,
}) {
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/flash-deal-products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      fetchProducts();

      toast.success("Product deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  }

  if (products.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        No flash deal products found.
      </p>
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

            <div>
              <span className="font-semibold">Discounted Price:</span> ৳
              {product.discountedPrice}
            </div>

            <div>
              <span className="font-semibold">Original Price:</span> ৳
              {product.originalPrice}
            </div>

            {/* {Math.round(
              ((product.originalPrice - product.discountedPrice) /
                product.originalPrice) *
                100,
            )} */}

            <div>
              <span className="font-semibold">Discount:</span>{" "}
              {/* {product.discountPercentage}% */}
              {Math.round(
                ((product.originalPrice - product.discountedPrice) /
                  product.originalPrice) *
                  100,
              )}
              %
            </div>

            <div>
              <span className="font-semibold">CTA Text:</span> {product.ctaText}
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
