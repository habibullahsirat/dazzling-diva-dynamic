"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import NavbarCategoryForm from "@/components/NavbarCategory/NavbarCategoryForm";
import NavbarCategoryList from "@/components/NavbarCategory/NavbarCategoryList";

export default function NavbarCategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  async function fetchCategories() {
    try {
      setLoading(true);

      const res = await fetch("/api/navbar-categories");
      const data = await res.json();

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function openAddModal() {
    setSelectedCategory(null);
    setIsModalOpen(true);
  }

  function openEditModal(category) {
    setSelectedCategory(category);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedCategory(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Total Navbar Categories ({categories.length})
        </h1>

        <button
          onClick={openAddModal}
          // className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          className="bg-gradient-to-r from-[#4A0932] via-[#5A0C3D] to-[#8A0B5B] text-white font-semibold px-5 py-2 rounded-lg hover:from-[#3D0729] hover:to-[#70094A] transition-all duration-300"
        >
          Add Category
        </button>
      </div>

      {/* Category List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <NavbarCategoryList
          categories={categories}
          fetchCategories={fetchCategories}
          onEdit={openEditModal}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            {/* Modal Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedCategory
                  ? "Edit Navbar Category"
                  : "Add Navbar Category"}
              </h2>

              <button onClick={closeModal} className="text-3xl">
                ×
              </button>
            </div>

            <NavbarCategoryForm
              category={selectedCategory}
              fetchCategories={fetchCategories}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
