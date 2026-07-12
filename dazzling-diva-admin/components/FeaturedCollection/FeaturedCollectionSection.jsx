"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import FeaturedCollectionForm from "./FeaturedCollectionForm";
import FeaturedCollectionList from "./FeaturedCollectionList";

export default function FeaturedCollectionSection() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  async function fetchCollections() {
    try {
      setLoading(true);

      const res = await fetch("/api/featured-collection");
      const data = await res.json();

      setCollections(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  function openAddModal() {
    setSelectedCollection(null);
    setIsModalOpen(true);
  }

  function openEditModal(collection) {
    setSelectedCollection(collection);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedCollection(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Featured Collections ({collections.length})
        </h1>

        <button
          onClick={openAddModal}
          // className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          className="bg-gradient-to-r from-[#4A0932] via-[#5A0C3D] to-[#8A0B5B] text-white font-semibold px-5 py-2 rounded-lg hover:from-[#3D0729] hover:to-[#70094A] transition-all duration-300"
        >
          Add Featured Collection
        </button>
      </div>

      {/* List */}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <FeaturedCollectionList
          collections={collections}
          fetchCollections={fetchCollections}
          onEdit={openEditModal}
        />
      )}

      {/* Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedCollection
                  ? "Edit Featured Collection"
                  : "Add Featured Collection"}
              </h2>

              <button onClick={closeModal} className="text-3xl leading-none">
                ×
              </button>
            </div>

            <FeaturedCollectionForm
              collection={selectedCollection}
              fetchCollections={fetchCollections}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
