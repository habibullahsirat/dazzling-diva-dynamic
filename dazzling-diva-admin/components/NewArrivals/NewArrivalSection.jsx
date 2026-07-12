"use client";

import { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import NewArrivalForm from "./NewArrivalForm";
import NewArrivalList from "./NewArrivalList";

export default function NewArrivalSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchProducts() {
    try {
      setLoading(true);

      const res = await fetch("/api/new-arrivals");

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function openAddModal() {
    setSelectedProduct(null);
    setIsModalOpen(true);
  }

  function openEditModal(product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Total Products ({products.length})
        </h1>

        <button
          onClick={openAddModal}
          // className="rounded bg-blue-600 px-5 py-2 text-white"
          className="bg-gradient-to-r from-[#4A0932] via-[#5A0C3D] to-[#8A0B5B] text-white font-semibold px-5 py-2 rounded-lg hover:from-[#3D0729] hover:to-[#70094A] transition-all duration-300"
        >
          Add Product
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <NewArrivalList
          products={products}
          fetchProducts={fetchProducts}
          onEdit={openEditModal}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedProduct ? "Edit Product" : "Add Product"}
              </h2>

              <button onClick={closeModal} className="text-3xl">
                ×
              </button>
            </div>

            <NewArrivalForm
              product={selectedProduct}
              fetchProducts={fetchProducts}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
