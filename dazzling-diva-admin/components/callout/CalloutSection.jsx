"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import CalloutForm from "./CalloutForm";
import CalloutList from "./CalloutList";

export default function CalloutSection() {
  const [callouts, setCallouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCallout, setSelectedCallout] = useState(null);

  async function fetchCallouts() {
    try {
      setLoading(true);

      const res = await fetch("/api/callout");
      const data = await res.json();

      setCallouts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCallouts();
  }, []);

  function openAddModal() {
    setSelectedCallout(null);
    setIsModalOpen(true);
  }

  function openEditModal(callout) {
    setSelectedCallout(callout);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedCallout(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Total Callouts ({callouts.length})
        </h1>

        {callouts.length === 0 && (
          <button
            onClick={openAddModal}
            // className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            className="bg-gradient-to-r from-[#4A0932] via-[#5A0C3D] to-[#8A0B5B] text-white font-semibold px-5 py-2 rounded-lg hover:from-[#3D0729] hover:to-[#70094A] transition-all duration-300"
          >
            Add Callout
          </button>
        )}
      </div>

      {/* List */}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <CalloutList
          callouts={callouts}
          fetchCallouts={fetchCallouts}
          onEdit={openEditModal}
        />
      )}

      {/* Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedCallout ? "Edit Callout" : "Add Callout"}
              </h2>

              <button onClick={closeModal} className="text-3xl">
                ×
              </button>
            </div>

            <CalloutForm
              callout={selectedCallout}
              fetchCallouts={fetchCallouts}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
