import type { ProductType } from "../../Types/Types";

type ProductProp = {
  product: ProductType;
};

export function Product({ product }: ProductProp) {


  return (
    <div className="bg-gray-100 h-100 font-semibold flex flex-col justify-between p-4 rounded-xl">
      {/* Image */}
      <div className="w-3/4 h-1/2 mx-auto">
        <img className="object-contain h-full w-full" src={product.image} />
      </div>

      {/* Product Title */}
      <div className="w-full line-clamp-3 text-center mt-2">
        {product.title}
      </div>

      {/* Bottom row: price + add to cart */}
      <div className="flex justify-between items-center mt-4 w-full">
        <div className="text-left">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}
