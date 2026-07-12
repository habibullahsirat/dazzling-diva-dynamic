"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TwoColumnList({ items, fetchItems, onEdit }) {
  async function handleDelete(id) {
    if (!window.confirm("Delete this section?")) return;

    try {
      const res = await fetch(`/api/two-column/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      fetchItems();

      toast.success("Deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed.");
    }
  }

  if (items.length === 0) {
    return <p className="py-10 text-center">No Two Column Section Found</p>;
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item._id} className="rounded-lg border bg-white p-5 shadow">
          <div className="grid gap-6 md:grid-cols-2">
            {/* LEFT */}

            <div>
              <div className="relative h-100">
                <Image
                  src={item.left.image}
                  alt=""
                  fill
                  className="rounded object-cover object-top"
                />
              </div>

              <h3 className="mt-3 font-bold">{item.left.categoryName}</h3>

              <p>{item.left.title}</p>

              <p>CTA : {item.left.cta?.text}</p>
            </div>

            {/* RIGHT */}

            <div>
              <div className="relative h-100">
                <Image
                  src={item.right.image}
                  alt=""
                  fill
                  className="rounded object-cover object-top"
                />
              </div>

              <h3 className="mt-3 font-bold">{item.right.categoryName}</h3>

              <p>{item.right.title}</p>

              <p>CTA : {item.right.cta?.text}</p>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={() => onEdit(item)}
              className="rounded bg-blue-600 p-2 text-white"
            >
              <FaEdit />
            </button>

            <button
              onClick={() => handleDelete(item._id)}
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
