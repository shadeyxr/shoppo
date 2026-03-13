import { Header } from "../Header";
import { Product } from "./Product";
import type { ProductType } from "../../Types/Types";
import { Link } from "react-router-dom";
import { Sort } from "./Sort";
import { useEffect, useState } from "react";

type HomePageProps = {
  products: ProductType[];
  loading: boolean;
  error: string | null;
};

function SkeletonCard() {
  return (
    <div className="flex flex-col justify-between p-4 rounded-xl h-full shadow animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
      <div className="h-5 bg-gray-200 rounded w-1/3" />
    </div>
  );
}

export function HomePage({ products, loading, error }: HomePageProps) {
  const [sort, setSort] = useState("Relevence");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>(products);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    filtered.sort((a, b) => {
      switch (sort) {
        case "Price: High - Low":
          return b.price - a.price;
        case "Price: Low - High":
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setSortedProducts(filtered);
  }, [sort, products, searchQuery]);

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="py-30 flex flex-col gap-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <Sort sort={sort} setSort={setSort} />

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-red-500 text-lg font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Skeleton loading */}
        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* No search results */}
        {!loading && !error && sortedProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="text-gray-500 text-lg">
              No products found for &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-500 hover:underline text-sm"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && sortedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {sortedProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Product product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
