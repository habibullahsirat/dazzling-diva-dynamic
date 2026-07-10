"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailedCalloutForm({
  section,
  fetchSections,
  closeModal,
}) {
  // Featured
  const [featuredCategory, setFeaturedCategory] = useState("");
  const [featuredTitle, setFeaturedTitle] = useState("");
  const [featuredCTA, setFeaturedCTA] = useState("");
  const [featuredHref, setFeaturedHref] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredPreview, setFeaturedPreview] = useState("");

  // Four cards
  const [cards, setCards] = useState([
    {
      categoryName: "",
      title: "",
      ctaText: "",
      ctaHref: "",
      image: null,
      preview: "",
    },
    {
      categoryName: "",
      title: "",
      ctaText: "",
      ctaHref: "",
      image: null,
      preview: "",
    },
    {
      categoryName: "",
      title: "",
      ctaText: "",
      ctaHref: "",
      image: null,
      preview: "",
    },
    {
      categoryName: "",
      title: "",
      ctaText: "",
      ctaHref: "",
      image: null,
      preview: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!section) return;

    setFeaturedCategory(section.featured.categoryName);
    setFeaturedTitle(section.featured.title);
    setFeaturedCTA(section.featured.cta?.text || "");
    setFeaturedHref(section.featured.cta?.href || "");
    setFeaturedPreview(section.featured.image);

    setCards(
      section.items.map((item) => ({
        categoryName: item.categoryName,
        title: item.title,
        ctaText: item.cta?.text || "",
        ctaHref: item.cta?.href || "",
        image: null,
        preview: item.image,
      })),
    );
  }, [section]);

  async function uploadImage(file) {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return data.secure_url;
  }

  function updateCard(index, field, value) {
    const temp = [...cards];

    temp[index][field] = value;

    setCards(temp);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      let featuredImageUrl = section?.featured.image || "";

      if (featuredImage) {
        featuredImageUrl = await uploadImage(featuredImage);
      }

      const finalCards = [];

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        let imageUrl = section?.items[i]?.image || "";

        if (card.image) {
          imageUrl = await uploadImage(card.image);
        }

        finalCards.push({
          image: imageUrl,
          categoryName: card.categoryName,
          title: card.title,
          cta: {
            text: card.ctaText,
            href: card.ctaHref,
          },
        });
      }

      const url = section
        ? `/api/detailed-callout/${section._id}`
        : "/api/detailed-callout";

      const method = section ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          featured: {
            image: featuredImageUrl,
            categoryName: featuredCategory,
            title: featuredTitle,
            cta: {
              text: featuredCTA,
              href: featuredHref,
            },
          },
          items: finalCards,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      fetchSections();

      toast.success(section ? "Updated successfully." : "Added successfully.");

      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Featured */}

      <div className="rounded-lg border p-5">
        <h2 className="mb-5 text-2xl font-bold">Featured Banner</h2>

        <div className="space-y-4">
          <input
            className="w-full rounded border p-2"
            placeholder="Category"
            value={featuredCategory}
            onChange={(e) => setFeaturedCategory(e.target.value)}
          />

          <input
            className="w-full rounded border p-2"
            placeholder="Title"
            value={featuredTitle}
            onChange={(e) => setFeaturedTitle(e.target.value)}
          />

          <input
            className="w-full rounded border p-2"
            placeholder="CTA Text"
            value={featuredCTA}
            onChange={(e) => setFeaturedCTA(e.target.value)}
          />

          <input
            className="w-full rounded border p-2"
            placeholder="CTA Link"
            value={featuredHref}
            onChange={(e) => setFeaturedHref(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setFeaturedImage(file);
              setFeaturedPreview(URL.createObjectURL(file));
            }}
          />

          {featuredPreview && (
            <img
              src={featuredPreview}
              className="h-56 w-full rounded object-cover"
            />
          )}
        </div>
      </div>

      {/* Four Cards */}

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card, index) => (
          <div key={index} className="rounded-lg border p-5">
            <h3 className="mb-4 text-xl font-bold">Card {index + 1}</h3>

            <div className="space-y-3">
              <input
                className="w-full rounded border p-2"
                placeholder="Category"
                value={card.categoryName}
                onChange={(e) =>
                  updateCard(index, "categoryName", e.target.value)
                }
              />

              <input
                className="w-full rounded border p-2"
                placeholder="Title"
                value={card.title}
                onChange={(e) => updateCard(index, "title", e.target.value)}
              />

              <input
                className="w-full rounded border p-2"
                placeholder="CTA Text"
                value={card.ctaText}
                onChange={(e) => updateCard(index, "ctaText", e.target.value)}
              />

              <input
                className="w-full rounded border p-2"
                placeholder="CTA Link"
                value={card.ctaHref}
                onChange={(e) => updateCard(index, "ctaHref", e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  updateCard(index, "image", file);
                  updateCard(index, "preview", URL.createObjectURL(file));
                }}
              />

              {card.preview && (
                <img
                  src={card.preview}
                  className="h-48 w-full rounded object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>

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
          {loading ? "Saving..." : section ? "Update Section" : "Add Section"}
        </button>
      </div>
    </form>
  );
}
