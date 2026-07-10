"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FeaturedCollectionForm({
  collection,
  fetchCollections,
  closeModal,
}) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (collection) {
      setPreview(collection.image);
      setImage(null);
    } else {
      setPreview("");
      setImage(null);
    }
  }, [collection]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = collection?.image || "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Image upload failed");
        }

        const uploaded = await uploadRes.json();

        imageUrl = uploaded.secure_url;
      }

      const url = collection
        ? `/api/featured-collection/${collection._id}`
        : "/api/featured-collection";

      const method = collection ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      await fetchCollections();

      toast.success(
        collection
          ? "Featured Collection updated."
          : "Featured Collection added.",
      );

      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">
          Featured Collection Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setImage(file);
            setPreview(URL.createObjectURL(file));
          }}
        />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-60 w-full rounded border object-cover"
        />
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={closeModal}
          className="rounded border px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-5 py-2 text-white"
        >
          {loading ? "Saving..." : collection ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
