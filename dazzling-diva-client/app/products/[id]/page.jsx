import { notFound } from "next/navigation";
import ProductDetails from "@/components/Product/ProductDetails";

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API}/api/products/${id}`,
    {
      cache: "no-store",
    },
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
