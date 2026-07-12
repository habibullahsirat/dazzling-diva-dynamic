"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function FlashDealList({ flashDeals, fetchFlashDeals, onEdit }) {
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this flash deal?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/flash-deals/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      await fetchFlashDeals();

      toast.success("Flash deal deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete flash deal.");
    }
  }

  if (flashDeals.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">No flash deals found.</p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {flashDeals.map((deal) => (
        <div
          key={deal._id}
          className="border-gray-300 overflow-hidden rounded-lg border bg-white shadow"
        >
          <div className="relative h-100">
            <Image
              src={deal.image}
              alt={deal.title}
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-3 p-4">
            <h2 className="text-xl font-bold">{deal.title}</h2>

            <div>
              <span className="font-semibold">Discount:</span> {deal.discount}
            </div>

            <div>
              <span className="font-semibold">Countdown:</span> {deal.countdown}
            </div>

            <p className="text-gray-600">{deal.description}</p>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => onEdit(deal)}
                className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(deal._id)}
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
