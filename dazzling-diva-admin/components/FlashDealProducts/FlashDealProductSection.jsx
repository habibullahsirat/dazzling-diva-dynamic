"use client";

import { useEffect, useState } from "react";
import FlashDealProductForm from "@/components/FlashDealProduct/FlashDealProductForm";
import FlashDealProductList from "@/components/FlashDealProduct/FlashDealProductList";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function FlashDealProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchProducts() {
    try {
      setLoading(true);

      const res = await fetch("/api/flash-deal-products");

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Total Flash Deal Products ({products.length})
        </h1>

        <button
          onClick={openAddModal}
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlashDealProductList
          products={products}
          fetchProducts={fetchProducts}
          onEdit={openEditModal}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedProduct
                  ? "Edit Flash Deal Product"
                  : "Add Flash Deal Product"}
              </h2>

              <button onClick={closeModal} className="text-3xl">
                ×
              </button>
            </div>

            <FlashDealProductForm
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
