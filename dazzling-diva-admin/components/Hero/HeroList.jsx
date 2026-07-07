"use client";

// import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function HeroList({ heroes, setHeroes }) {
  //   const [heroes, setHeroes] = useState([]);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     fetchHeroes();
  //   }, []);

  //   async function fetchHeroes() {
  //     try {
  //       const res = await fetch("/api/heroes");
  //       const data = await res.json();
  //       setHeroes(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

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

      setHeroes((prev) => prev.filter((hero) => hero._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete hero.");
    }
  }

  function handleEdit(hero) {
    console.log(hero);
    // Later you'll open your edit modal/form here.
  }

  //   if (loading) {
  //     return <p className="text-center py-10">Loading...</p>;
  //   }

  if (heroes.length === 0) {
    return <p className="text-center py-10">No heroes found.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {heroes.map((hero) => (
        <div
          key={hero._id}
          className="overflow-hidden rounded-xl border bg-white shadow"
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

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => handleEdit(hero)}
                className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(hero._id)}
                className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
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
