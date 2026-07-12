"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function HeroList({ heroes, fetchHeroes, onEdit }) {
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hero?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/heroes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // Refresh hero list
      fetchHeroes();
      toast.success("Hero deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete hero.");
    }
  }

  if (heroes.length === 0) {
    return <p className="py-10 text-center text-gray-500">No heroes found.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {heroes.map((hero) => (
        <div
          key={hero._id}
          className="overflow-hidden border-gray-300 rounded-lg border bg-white shadow"
        >
          <div className="relative h-56">
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-3 p-4">
            <h2 className="text-xl font-bold">{hero.title}</h2>

            <p className="text-gray-600">{hero.description}</p>

            <div>
              <span className="font-semibold">CTA Text:</span> {hero.cta?.text}
            </div>

            <div>
              <span className="font-semibold">CTA Link:</span>{" "}
              <a
                href={hero.cta?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {hero.cta?.href}
              </a>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => onEdit(hero)}
                className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(hero._id)}
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
