"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CalloutList({ callouts, fetchCallouts, onEdit }) {
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this callout?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/callout/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      await fetchCallouts();

      toast.success("Callout deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete callout.");
    }
  }

  if (callouts.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">No callouts found.</p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {callouts.map((callout) => (
        <div
          key={callout._id}
          className="border-gray-300 overflow-hidden rounded-lg border bg-white shadow"
        >
          <div className="relative h-100">
            <Image
              src={callout.image}
              alt={callout.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-3 p-4">
            <h3 className="font-semibold text-sm uppercase text-gray-500">
              {callout.category}
            </h3>

            <h2 className="text-xl font-bold">{callout.title}</h2>

            <div>
              <span className="font-semibold">CTA Text:</span>{" "}
              {callout.cta?.text}
            </div>

            <div>
              <span className="font-semibold">CTA Link:</span>{" "}
              <a
                href={callout.cta?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {callout.cta?.href}
              </a>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => onEdit(callout)}
                className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(callout._id)}
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
