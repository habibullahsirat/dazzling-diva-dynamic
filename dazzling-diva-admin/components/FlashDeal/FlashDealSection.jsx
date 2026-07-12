"use client";

import { useEffect, useState } from "react";
import FlashDealForm from "@/components/FlashDeal/FlashDealForm";
import FlashDealList from "@/components/FlashDeal/FlashDealList";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function FlashDealSection() {
  const [flashDeals, setFlashDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlashDeal, setSelectedFlashDeal] = useState(null);

  async function fetchFlashDeals() {
    try {
      setLoading(true);

      const res = await fetch("/api/flash-deals");
      const data = await res.json();

      setFlashDeals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFlashDeals();
  }, []);

  function openAddModal() {
    setSelectedFlashDeal(null);
    setIsModalOpen(true);
  }

  function openEditModal(flashDeal) {
    setSelectedFlashDeal(flashDeal);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedFlashDeal(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Total Flash Deals ({flashDeals.length})
        </h1>

        <button
          onClick={openAddModal}
          // className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          className="bg-gradient-to-r from-[#4A0932] via-[#5A0C3D] to-[#8A0B5B] text-white font-semibold px-5 py-2 rounded-lg hover:from-[#3D0729] hover:to-[#70094A] transition-all duration-300"
        >
          Add Flash Deal
        </button>
      </div>

      {/* List */}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlashDealList
          flashDeals={flashDeals}
          fetchFlashDeals={fetchFlashDeals}
          onEdit={openEditModal}
        />
      )}

      {/* Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedFlashDeal ? "Edit Flash Deal" : "Add Flash Deal"}
              </h2>

              <button onClick={closeModal} className="text-3xl">
                ×
              </button>
            </div>

            <FlashDealForm
              flashDeal={selectedFlashDeal}
              fetchFlashDeals={fetchFlashDeals}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
