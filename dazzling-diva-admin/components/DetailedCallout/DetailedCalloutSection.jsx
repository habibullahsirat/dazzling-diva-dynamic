"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import DetailedCalloutForm from "./DetailedCalloutForm";
import DetailedCalloutList from "./DetailedCalloutList";

export default function DetailedCalloutSection() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  async function fetchSections() {
    try {
      setLoading(true);

      const res = await fetch("/api/detailed-callout");
      const data = await res.json();

      setSections(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSections();
  }, []);

  function openAddModal() {
    setSelectedSection(null);
    setIsModalOpen(true);
  }

  function openEditModal(section) {
    setSelectedSection(section);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedSection(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Detailed Callout ({sections.length})
        </h1>

        <button
          onClick={openAddModal}
          // className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          className="bg-gradient-to-r from-[#4A0932] via-[#5A0C3D] to-[#8A0B5B] text-white font-semibold px-5 py-2 rounded-lg hover:from-[#3D0729] hover:to-[#70094A] transition-all duration-300"
        >
          Add Section
        </button>
      </div>

      {/* List */}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <DetailedCalloutList
          sections={sections}
          fetchSections={fetchSections}
          onEdit={openEditModal}
        />
      )}

      {/* Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedSection
                  ? "Edit Detailed Callout"
                  : "Add Detailed Callout"}
              </h2>

              <button onClick={closeModal} className="text-3xl">
                ×
              </button>
            </div>

            <DetailedCalloutForm
              section={selectedSection}
              fetchSections={fetchSections}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
