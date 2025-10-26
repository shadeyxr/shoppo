import { Header } from "../Header";
import { Product } from "../Product";
import type { ProductType } from "../../Types/Types";

type HomePageProps = {
  products: ProductType[]; // an array of products
};

export function HomePage({ products }: HomePageProps) {
  return (
    <>
      <Header />

      <div className="py-20">
        <div className="products-grid grid grid-cols-5 gap-10 mx-15 mt-10">
          {products.map((product) => {
            return <Product product={product} key={`product-${product.id}`} />;
          })}
        </div>
      </div>
    </>
  );
}
