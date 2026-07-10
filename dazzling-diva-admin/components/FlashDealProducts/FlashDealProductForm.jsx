"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FlashDealProductForm({
  product,
  fetchProducts,
  closeModal,
}) {
  const [title, setTitle] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [ctaText, setCtaText] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDiscountedPrice(product.discountedPrice);
      setOriginalPrice(product.originalPrice);
      setCtaText(product.ctaText);

      setPreview(product.image);
      setImage(null);
    } else {
      setTitle("");
      setDiscountedPrice("");
      setOriginalPrice("");
      setCtaText("");

      setPreview("");
      setImage(null);
    }
  }, [product]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !discountedPrice || !originalPrice || !ctaText) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = product?.image || "";

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

      const original = Number(originalPrice);
      const discounted = Number(discountedPrice);

      const discountPercentage = Math.round(
        ((original - discounted) / original) * 100,
      );

      const url = product
        ? `/api/flash-deal-products/${product._id}`
        : "/api/flash-deal-products";

      const method = product ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
          title,
          discountedPrice: discounted,
          originalPrice: original,
          discountPercentage,
          ctaText,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save product");
      }

      await fetchProducts();

      toast.success(
        product
          ? "Product updated successfully."
          : "Product added successfully.",
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
        <label className="mb-1 block font-medium">Product Title</label>

        <input
          className="w-full rounded border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Discounted Price</label>

        <input
          type="number"
          className="w-full rounded border p-2"
          value={discountedPrice}
          onChange={(e) => setDiscountedPrice(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Original Price</label>

        <input
          type="number"
          className="w-full rounded border p-2"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
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
        <label className="mb-2 block font-medium">Product Image</label>

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
          {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
