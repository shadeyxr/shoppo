import { Header } from "../Header";
import { Product } from "./Product";
import type { ProductType } from "../../Types/Types";
import { Link } from "react-router-dom";
import { Sort } from "./Sort";
import { useEffect, useState } from "react";

type HomePageProps = {
  products: ProductType[];
};

export function HomePage({ products }: HomePageProps) {
  if (!products) {
    throw new Error("Products not found");
  }

  const [sort, setSort] = useState("Relevence");
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>(products);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      switch (sort) {
        case "Price: High - Low":
          return b.price - a.price;
        case "Price: Low - High":
          return a.price - b.price;
        case "Relevence":
        default:
          return 0;
      }
    });

    setSortedProducts(sorted);
  }, [sort, products]);

  return (
    <>
      <Header />

      {/* Outer container with responsive padding */}
      <div className="py-30 flex flex-col gap-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        <Sort sort={sort} setSort={setSort} />

        {/* Responsive grid */}
        <div
          className="
            products-grid 
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            gap-8
          "
        >
          {sortedProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Product product={product} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}