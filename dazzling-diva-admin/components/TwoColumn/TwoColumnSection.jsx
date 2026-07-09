"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import TwoColumnForm from "./TwoColumnForm";
import TwoColumnList from "./TwoColumnList";

export default function TwoColumnSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  async function fetchItems() {
    try {
      setLoading(true);

      const res = await fetch("/api/two-column");
      const data = await res.json();

      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function openAddModal() {
    setSelectedItem(null);
    setIsModalOpen(true);
  }

  function openEditModal(item) {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedItem(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Two Column ({items.length})</h1>

        <button
          onClick={openAddModal}
          className="rounded bg-blue-600 px-5 py-2 text-white"
        >
          Add Two Column
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <TwoColumnList
          items={items}
          fetchItems={fetchItems}
          onEdit={openEditModal}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedItem ? "Edit Two Column" : "Add Two Column"}
              </h2>

              <button onClick={closeModal} className="text-3xl">
                ×
              </button>
            </div>

            <TwoColumnForm
              item={selectedItem}
              fetchItems={fetchItems}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
