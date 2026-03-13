import type { ProductType } from "../../Types/Types";
import { Star } from "lucide-react";

type ProductProp = {
  product: ProductType;
};

function StarRating({ rate, count }: { rate: number; count: number }) {
  const fullStars = Math.floor(rate);
  const hasHalf = rate - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1 mt-2">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < fullStars;
          const half = !filled && i === fullStars && hasHalf;
          return (
            <div key={i} className="relative w-4 h-4">
              {/* Background (empty) star */}
              <Star size={16} className="text-gray-300" fill="currentColor" />
              {/* Filled or half overlay */}
              {(filled || half) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? "50%" : "100%" }}
                >
                  <Star size={16} className="text-yellow-400" fill="currentColor" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

export function Product({ product }: ProductProp) {
  return (
    <div className="font-semibold flex flex-col justify-between p-4 rounded-xl h-full shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {/* Image */}
      <div className="w-full h-48 flex items-center justify-center">
        <img
          className="object-contain h-full w-full"
          src={product.image}
          alt={product.title}
        />
      </div>

      {/* Product Title */}
      <div className="mt-2 text-center line-clamp-3">{product.title}</div>

      {/* Star rating */}
      <div className="flex justify-center">
        {product.rating && (
          <StarRating rate={product.rating.rate} count={product.rating.count} />
        )}
      </div>

      {/* Price */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-lg font-bold text-left">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
