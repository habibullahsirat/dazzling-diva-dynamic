"use client";

import { useEffect, useState } from "react";
import HeroForm from "@/components/Hero/HeroForm";
import HeroList from "@/components/Hero/HeroList";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HeroSection() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedHero, setSelectedHero] = useState(null);

  async function fetchHeroes() {
    try {
      setLoading(true);

      const res = await fetch("/api/heroes");
      const data = await res.json();

      setHeroes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHeroes();
  }, []);

  function openAddModal() {
    setSelectedHero(null);
    setIsModalOpen(true);
  }

  function openEditModal(hero) {
    setSelectedHero(hero);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedHero(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Total Heroes ({heroes.length})</h1>

        <button
          onClick={openAddModal}
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Add Hero
        </button>
      </div>

      {/* Hero List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <HeroList
          heroes={heroes}
          setHeroes={setHeroes}
          fetchHeroes={fetchHeroes}
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
                {selectedHero ? "Edit Hero" : "Add Hero"}
              </h2>

              <button onClick={closeModal} className="text-3xl">
                ×
              </button>
            </div>

            <HeroForm
              hero={selectedHero}
              fetchHeroes={fetchHeroes}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
