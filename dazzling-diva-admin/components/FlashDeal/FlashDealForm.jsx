"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FlashDealForm({
  flashDeal,
  fetchFlashDeals,
  closeModal,
}) {
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");
  const [countdown, setCountdown] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // Fill form while editing
  useEffect(() => {
    if (flashDeal) {
      setTitle(flashDeal.title || "");
      setDiscount(flashDeal.discountAmount || "");

      setCountdown(
        flashDeal.countdown
          ? new Date(flashDeal.countdown).toISOString().slice(0, 16)
          : "",
      );

      setDescription(flashDeal.description || "");

      setPreview(flashDeal.image || "");
      setImage(null);
    } else {
      setTitle("");
      setDiscount("");
      setCountdown("");
      setDescription("");

      setImage(null);
      setPreview("");
    }
  }, [flashDeal]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !discount || !countdown || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = flashDeal?.image || "";

      // Upload image if selected
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

      const url = flashDeal
        ? `/api/flash-deals/${flashDeal._id}`
        : "/api/flash-deals";

      const method = flashDeal ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
          title,
          discountAmount: discount,
          countdown,
          description,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save flash deal");
      }

      await fetchFlashDeals();

      toast.success(
        flashDeal
          ? "Flash deal updated successfully."
          : "Flash deal added successfully.",
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
        <label className="mb-1 block font-medium">Flash Deal Title</label>

        <input
          className="w-full rounded border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Discount Amount</label>

        <input
          className="w-full rounded border p-2"
          placeholder="UP TO 50% OFF"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Countdown End Date</label>

        <input
          type="datetime-local"
          className="w-full rounded border p-2"
          value={countdown}
          onChange={(e) => setCountdown(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Description</label>

        <textarea
          rows={4}
          className="w-full rounded border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          {loading
            ? "Saving..."
            : flashDeal
              ? "Update Flash Deal"
              : "Add Flash Deal"}
        </button>
      </div>
    </form>
  );
}
