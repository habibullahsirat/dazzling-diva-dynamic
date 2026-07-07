// "use client";

// import { useState } from "react";

// export default function HeroForm({ onSuccess, onClose }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [ctaText, setCtaText] = useState("");
//   const [ctaHref, setCtaHref] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!title || !description || !image) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Upload image to Cloudinary
//       const uploadData = new FormData();
//       uploadData.append("file", image);

//       const uploadRes = await fetch("/api/upload", {
//         method: "POST",
//         body: uploadData,
//       });

//       if (!uploadRes.ok) {
//         throw new Error("Image upload failed.");
//       }

//       const uploaded = await uploadRes.json();

//       // Save hero data
//       const heroRes = await fetch("/api/heroes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           image: uploaded.secure_url,
//           cta: {
//             text: ctaText,
//             href: ctaHref,
//           },
//         }),
//       });

//       if (!heroRes.ok) {
//         throw new Error("Failed to save hero.");
//       }

//       // alert("Hero Added Successfully!");
//       const createdHero = await heroRes.json();

//       onSuccess(createdHero.data);
//       onClose();

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setCtaText("");
//       setCtaHref("");
//       setImage(null);

//       // Reset file input
//       document.getElementById("hero-image").value = "";
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg space-y-4 rounded-lg bg-white p-6 shadow"
//     >
//       <input
//         type="text"
//         className="w-full rounded border p-2"
//         placeholder="Hero Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         className="w-full rounded border p-2"
//         placeholder="Hero Description"
//         rows={4}
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <input
//         type="text"
//         className="w-full rounded border p-2"
//         placeholder="CTA Button Text"
//         value={ctaText}
//         onChange={(e) => setCtaText(e.target.value)}
//       />

//       <input
//         type="text"
//         className="w-full rounded border p-2"
//         placeholder="CTA Link"
//         value={ctaHref}
//         onChange={(e) => setCtaHref(e.target.value)}
//       />

//       <input
//         id="hero-image"
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files && e.target.files.length > 0) {
//             setImage(e.target.files[0]);
//           }
//         }}
//       />

//       {image && (
//         <img
//           src={URL.createObjectURL(image)}
//           alt="Preview"
//           className="h-40 w-full rounded border object-cover"
//         />
//       )}

//       <button
//         type="submit"
//         disabled={loading}
//         className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//       >
//         {loading ? "Uploading..." : "Add Hero"}
//       </button>
//     </form>
//   );
// }

//////////////////////////////////////////
// "use client";

// import { useState } from "react";

// export default function HeroForm({ onSuccess, onClose }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [ctaText, setCtaText] = useState("");
//   const [ctaHref, setCtaHref] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!title || !description || !image) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Upload image
//       const uploadData = new FormData();
//       uploadData.append("file", image);

//       const uploadRes = await fetch("/api/upload", {
//         method: "POST",
//         body: uploadData,
//       });

//       if (!uploadRes.ok) {
//         throw new Error("Image upload failed");
//       }

//       const uploaded = await uploadRes.json();

//       // Save hero
//       const heroRes = await fetch("/api/heroes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           image: uploaded.secure_url,
//           cta: {
//             text: ctaText,
//             href: ctaHref,
//           },
//         }),
//       });

//       if (!heroRes.ok) {
//         throw new Error("Failed to save hero");
//       }

//       // Refresh hero list
//       await onSuccess();

//       // Close modal
//       onClose();

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setCtaText("");
//       setCtaHref("");
//       setImage(null);

//       const input = document.getElementById("hero-image");
//       if (input) {
//         input.value = "";
//       }

//       alert("Hero Added Successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         placeholder="Hero Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full rounded border p-2"
//       />

//       <textarea
//         rows={4}
//         placeholder="Hero Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="w-full rounded border p-2"
//       />

//       <input
//         type="text"
//         placeholder="CTA Text"
//         value={ctaText}
//         onChange={(e) => setCtaText(e.target.value)}
//         className="w-full rounded border p-2"
//       />

//       <input
//         type="text"
//         placeholder="CTA Link"
//         value={ctaHref}
//         onChange={(e) => setCtaHref(e.target.value)}
//         className="w-full rounded border p-2"
//       />

//       <input
//         id="hero-image"
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files?.length) {
//             setImage(e.target.files[0]);
//           }
//         }}
//       />

//       {image && (
//         <img
//           src={URL.createObjectURL(image)}
//           alt="Preview"
//           className="h-40 w-full rounded border object-cover"
//         />
//       )}

//       <button
//         type="submit"
//         disabled={loading}
//         className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
//       >
//         {loading ? "Uploading..." : "Add Hero"}
//       </button>
//     </form>
//   );
// }

"use client";

import { useEffect, useState } from "react";

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
      alert("Please fill all required fields.");
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

      closeModal();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
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
