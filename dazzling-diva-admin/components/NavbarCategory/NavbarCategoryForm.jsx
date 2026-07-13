// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function NavbarCategoryForm({
//   category,
//   fetchCategories,
//   closeModal,
// }) {
//   const [name, setName] = useState("");
//   const [href, setHref] = useState("");
//   //   const [link, setLink] = useState("");

//   const [loading, setLoading] = useState(false);

//   // Fill form while editing
//   useEffect(() => {
//     if (category) {
//       setName(category.name);
//       setHref(category.href);
//     } else {
//       setName("");
//       setHref("");
//     }
//   }, [category]);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!name || !href) {
//       toast.error("Please fill all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const url = category
//         ? `/api/navbar-categories/${category._id}`
//         : "/api/navbar-categories";

//       const method = category ? "PATCH" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           href,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to save category");
//       }

//       await fetchCategories();

//       toast.success(
//         category
//           ? "Category updated successfully."
//           : "Category added successfully.",
//       );

//       closeModal();
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5">
//       <div>
//         <label className="mb-1 block font-medium">Category Name</label>

//         <input
//           className="w-full rounded border p-2"
//           placeholder="Saree"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>

//       <div>
//         <label className="mb-1 block font-medium">Navigation Link</label>

//         <input
//           className="w-full rounded border p-2"
//           placeholder="/category/saree"
//           value={href}
//           onChange={(e) => setHref(e.target.value)}
//         />
//       </div>

//       <div className="flex justify-end gap-3 pt-3">
//         <button
//           type="button"
//           onClick={closeModal}
//           className="rounded border px-5 py-2"
//         >
//           Cancel
//         </button>

//         <button
//           type="submit"
//           disabled={loading}
//           className="rounded bg-blue-600 px-5 py-2 text-white"
//         >
//           {loading
//             ? "Saving..."
//             : category
//               ? "Update Category"
//               : "Add Category"}
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NavbarCategoryForm({
  category,
  fetchCategories,
  closeModal,
}) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [href, setHref] = useState("");

  const [loading, setLoading] = useState(false);

  // Convert text to URL-friendly slug
  function generateSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  // Fill form while editing
  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug || "");
      setHref(category.href);
    } else {
      setName("");
      setSlug("");
      setHref("");
    }
  }, [category]);

  // Automatically generate slug & href while typing
  function handleNameChange(e) {
    const value = e.target.value;

    setName(value);

    const generatedSlug = generateSlug(value);

    setSlug(generatedSlug);
    setHref(`/category/${generatedSlug}`);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !slug || !href) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const url = category
        ? `/api/navbar-categories/${category._id}`
        : "/api/navbar-categories";

      const method = category ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          href,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save category");
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
      {/* Category Name */}
      <div>
        <label className="mb-1 block font-medium">Category Name</label>

        <input
          className="w-full rounded border p-2"
          placeholder="Sharee"
          value={name}
          onChange={handleNameChange}
        />
      </div>

      {/* Slug */}
      <div>
        <label className="mb-1 block font-medium">Slug</label>

        <input
          className="w-full rounded border p-2"
          placeholder="sharee"
          value={slug}
          onChange={(e) => setSlug(generateSlug(e.target.value))}
        />

        <p className="mt-1 text-sm text-gray-500">
          Used for URLs. Example: sharee
        </p>
      </div>

      {/* Navigation Link */}
      <div>
        <label className="mb-1 block font-medium">Navigation Link</label>

        <input
          className="w-full rounded border p-2 bg-gray-100"
          value={href}
          readOnly
        />

        <p className="mt-1 text-sm text-gray-500">
          Generated automatically from the slug.
        </p>
      </div>

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
