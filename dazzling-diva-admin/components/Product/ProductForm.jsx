"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductForm({ product, fetchProducts, closeModal }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isFlashDeal, setIsFlashDeal] = useState(false);
  const [isMostLoved, setIsMostLoved] = useState(false);

  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/navbar-categories");

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories.");
      }
    }

    fetchCategories();
  }, []);

  // Fill form while editing
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);

      setIsNewArrival(product.isNewArrival || false);
      setIsFlashDeal(product.isFlashDeal || false);
      setIsMostLoved(product.isMostLoved || false);

      setPreview(product.image);
      setImage(null);
    } else {
      setTitle("");
      setPrice("");

      setCategoryId("");

      setIsNewArrival(false);
      setIsFlashDeal(false);
      setIsMostLoved(false);

      setImage(null);
      setPreview("");
    }
  }, [product]);

  // Select category while editing
  useEffect(() => {
    if (product && categories.length > 0) {
      // const selected = categories.find(
      //   (item) => item.name === product.category?.name,
      // );

      const selected = categories.find(
        (item) => item.slug === product.category?.slug,
      );

      setCategoryId(selected?._id || "");
    }
  }, [product, categories]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !price || !categoryId) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = product?.image || "";

      // Upload new image
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

      const selectedCategory = categories.find(
        (item) => item._id === categoryId,
      );

      if (!selectedCategory) {
        toast.error("Please select a category.");
        return;
      }

      const url = product ? `/api/products/${product._id}` : "/api/products";

      const method = product ? "PATCH" : "POST";

      const body = {
        title,
        price: Number(price),
        image: imageUrl,

        category: {
          name: selectedCategory.name,
          slug: selectedCategory.slug,
          href: selectedCategory.href,
        },

        isNewArrival,
        isFlashDeal,
        isMostLoved,
      };

      console.log("Submitting Product:", body);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
      {/* Product Title */}
      <div>
        <label className="mb-1 block font-medium">Product Title</label>

        <input
          type="text"
          className="w-full rounded border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter product title"
        />
      </div>

      {/* Product Price */}
      <div>
        <label className="mb-1 block font-medium">Product Price</label>

        <input
          type="number"
          className="w-full rounded border p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-1 block font-medium">Category</label>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="">Select Category</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Sections */}
      <div className="space-y-3 rounded border p-4">
        <h3 className="font-semibold">Product Sections</h3>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isNewArrival}
            onChange={(e) => setIsNewArrival(e.target.checked)}
          />
          New Arrival
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isFlashDeal}
            onChange={(e) => setIsFlashDeal(e.target.checked)}
          />
          Flash Deal
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isMostLoved}
            onChange={(e) => setIsMostLoved(e.target.checked)}
          />
          Most Loved
        </label>
      </div>

      {/* Product Image */}
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

      {/* Buttons */}
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
          className="rounded bg-blue-600 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
