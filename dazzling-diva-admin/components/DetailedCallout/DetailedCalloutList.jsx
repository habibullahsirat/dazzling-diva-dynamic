"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function DetailedCalloutList({
  sections,
  fetchSections,
  onEdit,
}) {
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this section?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/detailed-callout/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      fetchSections();

      toast.success("Section deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete section.");
    }
  }

  if (sections.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        No Detailed Callout found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div
          key={section._id}
          className="overflow-hidden rounded-lg border bg-white shadow"
        >
          {/* Featured Banner */}

          <div className="border-b p-5">
            <h2 className="mb-4 text-xl font-bold">Featured Banner</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative h-150">
                <Image
                  src={section.featured.image}
                  alt={section.featured.title}
                  fill
                  sizes="100vw"
                  className="rounded object-cover object-top"
                />
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {section.featured.categoryName}
                </p>

                <p>
                  <span className="font-semibold">Title:</span>{" "}
                  {section.featured.title}
                </p>

                <p>
                  <span className="font-semibold">CTA:</span>{" "}
                  {section.featured.cta?.text}
                </p>

                <p>
                  <span className="font-semibold">CTA Link:</span>{" "}
                  {section.featured.cta?.href}
                </p>
              </div>
            </div>
          </div>

          {/* Four Cards */}

          <div className="grid gap-5 p-5 md:grid-cols-2">
            {section.items.map((item, index) => (
              <div
                key={index}
                className="border-gray-300 overflow-hidden rounded-lg border"
              >
                <div className="relative h-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-2 p-4">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {item.categoryName}
                  </p>

                  <p>
                    <span className="font-semibold">Title:</span> {item.title}
                  </p>

                  <p>
                    <span className="font-semibold">CTA:</span> {item.cta?.text}
                  </p>

                  <p>
                    <span className="font-semibold">CTA Link:</span>{" "}
                    {item.cta?.href}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t p-4">
            <button
              onClick={() => onEdit(section)}
              className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
              <FaEdit />
            </button>

            <button
              onClick={() => handleDelete(section._id)}
              className="rounded bg-red-600 p-2 text-white hover:bg-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
