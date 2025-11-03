import type { ProductType } from "../../Types/Types";

type ProductProp = {
  product: ProductType;
};

export function Product({ product }: ProductProp) {
  return (
    <div className="bg-gray-100 font-semibold flex flex-col justify-between p-4 rounded-xl h-full shadow hover:shadow-lg">
      {/* Image */}
      <div className="w-full h-48 flex items-center justify-center">
        <img className="object-contain h-full w-full" src={product.image} alt={product.title} />
      </div>

      {/* Product Title */}
      <div className="mt-2 text-center line-clamp-3">
        {product.title}
      </div>

      {/* Bottom row: price */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-lg font-bold text-left">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}