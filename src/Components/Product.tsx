import type { ProductType } from "../Types/ProductType";

type ProductProp = {
  product: ProductType;
};

export function Product({ product }: ProductProp) {
  return (
    <div className="bg-gray-200 h-100 font-semibold flex flex-col justify-between p-4">
      {/* Image */}
      <div className="w-3/4 h-50 mx-auto">
        <img className="object-contain h-full w-full" src={product.image} />
      </div>

      {/* Product Title */}
      <div className="w-full line-clamp-3 text-center mt-2">
        {product.title}
      </div>

      {/* Bottom row: price + add to cart */}
      <div className="flex justify-between items-center mt-4 w-full">
        <div className="text-left">${product.price.toFixed(2)}</div>
        <button className="bg-[#187AFF] text-white px-3 py-1 rounded-lg cursor-pointer">
          Add to cart
        </button>
      </div>
    </div>
  );
}
