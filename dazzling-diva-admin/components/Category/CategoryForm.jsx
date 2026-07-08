"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoryForm({
  category,
  fetchCategories,
  closeModal,
}) {
  const [name, setName] = useState("");
  const [ctaText, setCtaText] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setCtaText(category.cta?.text || "");
      setPreview(category.image);
      setImage(null);
    } else {
      setName("");
      setCtaText("");
      setPreview("");
      setImage(null);
    }
  }, [category]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = category?.image || "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploaded = await uploadRes.json();

        imageUrl = uploaded.secure_url;
      }

      const url = category
        ? `/api/categories/${category._id}`
        : "/api/categories";

      const method = category ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          image: imageUrl,
          cta: {
            text: ctaText,
          },
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      await fetchCategories();

      toast.success(
        category
          ? "Category updated successfully."
          : "Category added successfully.",
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
        <label className="mb-1 block font-medium">Category Name</label>

        <input
          className="w-full rounded border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">CTA Text</label>

        <input
          className="w-full rounded border p-2"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Category Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.length) {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-52 w-full rounded border object-cover"
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
          {loading
            ? "Saving..."
            : category
              ? "Update Category"
              : "Add Category"}
        </button>
      </div>
    </form>
  );
}
