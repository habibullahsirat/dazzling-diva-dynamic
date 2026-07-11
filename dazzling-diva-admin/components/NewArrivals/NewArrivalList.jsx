"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function NewArrivalList({ products, fetchProducts, onEdit }) {
  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(`/api/new-arrivals/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      fetchProducts();

      toast.success("Product deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed.");
    }
  }

  if (products.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">No products found.</p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="overflow-hidden rounded-lg border bg-white shadow"
        >
          <div className="relative h-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="300px"
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-3 p-4">
            <h2 className="text-lg font-bold">{product.title}</h2>

            <p className="font-semibold text-pink-700">
              ৳ {Number(product.price).toLocaleString()}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => onEdit(product)}
                className="rounded bg-blue-600 p-2 text-white"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="rounded bg-red-600 p-2 text-white"
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
