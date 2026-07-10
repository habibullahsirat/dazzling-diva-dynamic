"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CalloutForm({ callout, fetchCallouts, closeModal }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaHref, setCtaHref] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (callout) {
      setCategory(callout.category);
      setTitle(callout.title);
      setCtaText(callout.cta?.text || "");
      setCtaHref(callout.cta?.href || "");
      setPreview(callout.image);
      setImage(null);
    } else {
      setCategory("");
      setTitle("");
      setCtaText("");
      setCtaHref("");
      setPreview("");
      setImage(null);
    }
  }, [callout]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!category || !title) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = callout?.image || "";

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

      const url = callout ? `/api/callout/${callout._id}` : "/api/callout";

      const method = callout ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
          category,
          title,
          cta: {
            text: ctaText,
            href: ctaHref,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      await fetchCallouts();

      toast.success(
        callout
          ? "Callout updated successfully."
          : "Callout added successfully.",
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
        <label className="mb-1 block font-medium">Category</label>

        <input
          className="w-full rounded border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Title</label>

        <textarea
          rows={4}
          className="w-full rounded border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <label className="mb-2 block font-medium">Banner Image</label>

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
          className="h-56 w-full rounded border object-cover"
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
          {loading ? "Saving..." : callout ? "Update Callout" : "Add Callout"}
        </button>
      </div>
    </form>
  );
}
