"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TwoColumnForm({ item, fetchItems, closeModal }) {
  // LEFT

  const [leftCategory, setLeftCategory] = useState("");
  const [leftTitle, setLeftTitle] = useState("");
  const [leftCTA, setLeftCTA] = useState("");

  const [leftImage, setLeftImage] = useState(null);
  const [leftPreview, setLeftPreview] = useState("");

  // RIGHT

  const [rightCategory, setRightCategory] = useState("");
  const [rightTitle, setRightTitle] = useState("");
  const [rightCTA, setRightCTA] = useState("");

  const [rightImage, setRightImage] = useState(null);
  const [rightPreview, setRightPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setLeftCategory(item.left.category_name);
      setLeftTitle(item.left.title);
      setLeftCTA(item.left.cta?.text);
      setLeftPreview(item.left.image);

      setRightCategory(item.right.category_name);
      setRightTitle(item.right.title);
      setRightCTA(item.right.cta?.text);
      setRightPreview(item.right.image);
    }
  }, [item]);

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

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      let leftImageUrl = item?.left.image || "";
      let rightImageUrl = item?.right.image || "";

      if (leftImage) {
        leftImageUrl = await uploadImage(leftImage);
      }

      if (rightImage) {
        rightImageUrl = await uploadImage(rightImage);
      }

      const url = item ? `/api/two-column/${item._id}` : "/api/two-column";

      const method = item ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          left: {
            category_name: leftCategory,
            title: leftTitle,
            image: leftImageUrl,
            cta: {
              text: leftCTA,
            },
          },
          right: {
            category_name: rightCategory,
            title: rightTitle,
            image: rightImageUrl,
            cta: {
              text: rightCTA,
            },
          },
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      fetchItems();

      toast.success(item ? "Updated successfully." : "Added successfully.");

      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function ImageInput(label, preview, setImage, setPreview) {
    return (
      <div>
        <label className="font-medium">{label}</label>

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

        {preview && (
          <img
            src={preview}
            className="mt-3 h-48 w-full rounded object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
      {/* LEFT */}

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Left Banner</h2>

        <input
          className="w-full rounded border p-2"
          placeholder="Category Name"
          value={leftCategory}
          onChange={(e) => setLeftCategory(e.target.value)}
        />

        <input
          className="w-full rounded border p-2"
          placeholder="Title"
          value={leftTitle}
          onChange={(e) => setLeftTitle(e.target.value)}
        />

        <input
          className="w-full rounded border p-2"
          placeholder="CTA Text"
          value={leftCTA}
          onChange={(e) => setLeftCTA(e.target.value)}
        />

        {ImageInput("Banner Image", leftPreview, setLeftImage, setLeftPreview)}
      </div>

      {/* RIGHT */}

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Right Banner</h2>

        <input
          className="w-full rounded border p-2"
          placeholder="Category Name"
          value={rightCategory}
          onChange={(e) => setRightCategory(e.target.value)}
        />

        <input
          className="w-full rounded border p-2"
          placeholder="Title"
          value={rightTitle}
          onChange={(e) => setRightTitle(e.target.value)}
        />

        <input
          className="w-full rounded border p-2"
          placeholder="CTA Text"
          value={rightCTA}
          onChange={(e) => setRightCTA(e.target.value)}
        />

        {ImageInput(
          "Banner Image",
          rightPreview,
          setRightImage,
          setRightPreview,
        )}
      </div>

      <div className="md:col-span-2 flex justify-end gap-3">
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
          {loading ? "Saving..." : item ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
