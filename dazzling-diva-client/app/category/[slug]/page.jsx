import ProductGrid from "@/components/Product/ProductGrid";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const products = await getProducts();

  const filteredProducts = products.filter(
    (product) => product.category?.slug === slug,
  );

  const categoryName =
    filteredProducts.length > 0
      ? filteredProducts[0].category.name
      : "Category";

  return (
    <ProductGrid
      title={categoryName}
      subtitle={`Browse ${categoryName}`}
      products={filteredProducts}
    />
  );
}
