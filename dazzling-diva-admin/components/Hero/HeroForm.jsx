"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HeroForm({ hero, fetchHeroes, closeModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaHref, setCtaHref] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // Fill form when editing
  useEffect(() => {
    if (hero) {
      setTitle(hero.title);
      setDescription(hero.description);
      setCtaText(hero.cta?.text || "");
      setCtaHref(hero.cta?.href || "");
      setPreview(hero.image);
      setImage(null);
    } else {
      setTitle("");
      setDescription("");
      setCtaText("");
      setCtaHref("");
      setImage(null);
      setPreview("");
    }
  }, [hero]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Keep old image while editing
      let imageUrl = hero?.image || "";

      // Upload only if user selected a new image
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

      const url = hero ? `/api/heroes/${hero._id}` : "/api/heroes";

      const method = hero ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image: imageUrl,
          cta: {
            text: ctaText,
            href: ctaHref,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save hero");
      }

      await fetchHeroes();

      toast.success(
        hero ? "Hero updated successfully." : "Hero added successfully.",
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
        <label className="mb-1 block font-medium">Hero Title</label>

        <input
          className="w-full rounded border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Hero Description</label>

        <textarea
          rows={4}
          className="w-full rounded border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <label className="mb-1 block font-medium">CTA Link</label>

        <input
          className="w-full rounded border p-2"
          value={ctaHref}
          onChange={(e) => setCtaHref(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Hero Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.length) {
              const file = e.target.files[0];

              setImage(file);

              setPreview(URL.createObjectURL(file));
            }
            // const file = e.target.files[0];

            // if (!file) return;

            // // Maximum 2 MB
            // if (file.size > 2 * 1024 * 1024) {
            //   toast.error("Image must be smaller than 2 MB.");
            //   return;
            // }

            // // Only images
            // if (!file.type.startsWith("image/")) {
            //   toast.error("Please select an image.");
            //   return;
            // }

            // setImage(file);
            // setPreview(URL.createObjectURL(file));
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

      <div className="flex justify-end gap-3 pt-3">
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
          {loading ? "Saving..." : hero ? "Update Hero" : "Add Hero"}
        </button>
      </div>
    </form>
  );
}
