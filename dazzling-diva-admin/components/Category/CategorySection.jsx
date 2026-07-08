"use client";

import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  async function fetchCategories() {
    try {
      setLoading(true);

      const res = await fetch("/api/categories");

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Total Categories ({categories.length})
        </h1>

        <button
          onClick={openAddModal}
          className="rounded bg-blue-600 px-5 py-2 text-white"
        >
          Add Category
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <CategoryList
          categories={categories}
          fetchCategories={fetchCategories}
          onEdit={openEditModal}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedCategory ? "Edit Category" : "Add Category"}
              </h2>

              <button onClick={closeModal} className="text-3xl">
                ×
              </button>
            </div>

            <CategoryForm
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
