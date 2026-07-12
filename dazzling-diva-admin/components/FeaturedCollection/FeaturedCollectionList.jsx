"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function FeaturedCollectionList({
  collections,
  fetchCollections,
  onEdit,
}) {
  async function handleDelete(id) {
    if (!window.confirm("Delete this image?")) return;

    try {
      const res = await fetch(`/api/featured-collection/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      await fetchCollections();

      toast.success("Deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed.");
    }
  }

  if (collections.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        No Featured Collection found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {collections.map((collection) => (
        <div
          key={collection._id}
          className="border-gray-300 overflow-hidden rounded-lg border bg-white shadow"
        >
          <div className="relative h-100">
            <Image
              src={collection.image}
              alt="Featured Collection"
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>

          <div className="flex justify-end gap-3 p-4">
            <button
              onClick={() => onEdit(collection)}
              className="rounded bg-blue-600 p-2 text-white"
            >
              <FaEdit />
            </button>

            <button
              onClick={() => handleDelete(collection._id)}
              className="rounded bg-red-600 p-2 text-white"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
