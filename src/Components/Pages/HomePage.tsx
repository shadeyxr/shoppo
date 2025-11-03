import { Header } from "../Header";
import { Product } from "./Product";
import type { ProductType } from "../../Types/Types";
import { Link } from "react-router-dom";
import { Sort } from "./Sort";
import { useEffect, useState } from "react";

type HomePageProps = {
  products: ProductType[]; // an array of products
};

export function HomePage({ products }: HomePageProps) {
  if (!products) {
    throw new Error("Products not found");
  }
  const [sort, setSort] = useState('Relevence')
  
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>(products);

useEffect(() => {
  const sorted = [...products].sort((a, b) => {
    switch (sort) {
      case "Price: High - Low":
        return b.price - a.price; // high → low
      case "Price: Low - High":
        return a.price - b.price; // low → high
      case "Relevence":
      default:
        return 0; // no sorting
    }
  });

  setSortedProducts(sorted);
}, [sort, products]);



  return (
    <>
      <Header />

      <div className="py-25 flex flex-col gap-4 px-15">
        <Sort sort={sort} setSort={setSort} />

        <div className="products-grid grid grid-cols-5 gap-10">
          {sortedProducts.map((product) => (
            <Link to={`/product/${product.id}`}>
              <Product product={product} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
