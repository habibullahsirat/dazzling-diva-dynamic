"use client";

import { useState } from "react";

export default function HeroForm({ onSuccess, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaHref, setCtaHref] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Upload image to Cloudinary
      const uploadData = new FormData();
      uploadData.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!uploadRes.ok) {
        throw new Error("Image upload failed.");
      }

      const uploaded = await uploadRes.json();

      // Save hero data
      const heroRes = await fetch("/api/heroes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image: uploaded.secure_url,
          cta: {
            text: ctaText,
            href: ctaHref,
          },
        }),
      });

      if (!heroRes.ok) {
        throw new Error("Failed to save hero.");
      }

      // alert("Hero Added Successfully!");
      const createdHero = await heroRes.json();

      onSuccess(createdHero.data);
      onClose();

      // Reset form
      setTitle("");
      setDescription("");
      setCtaText("");
      setCtaHref("");
      setImage(null);

      // Reset file input
      document.getElementById("hero-image").value = "";
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-4 rounded-lg bg-white p-6 shadow"
    >
      <input
        type="text"
        className="w-full rounded border p-2"
        placeholder="Hero Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full rounded border p-2"
        placeholder="Hero Description"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        className="w-full rounded border p-2"
        placeholder="CTA Button Text"
        value={ctaText}
        onChange={(e) => setCtaText(e.target.value)}
      />

      <input
        type="text"
        className="w-full rounded border p-2"
        placeholder="CTA Link"
        value={ctaHref}
        onChange={(e) => setCtaHref(e.target.value)}
      />

      <input
        id="hero-image"
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
          }
        }}
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="h-40 w-full rounded border object-cover"
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Add Hero"}
      </button>
    </form>
  );
}
