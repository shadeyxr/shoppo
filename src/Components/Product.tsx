import { useState } from "react";
import type { ProductType } from "../Types/Types";
import { useContext } from "react";
import { CartContext } from "../CartContext";

type ProductProp = {
  product: ProductType;
};

export function Product({ product }: ProductProp) {
  const [added, setAdded] = useState(false);
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { addToCart } = cartContext;

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setInterval(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <div className="bg-gray-200 h-100 font-semibold flex flex-col justify-between p-4">
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
        <button
          className={`text-white px-3 py-1 rounded-lg cursor-pointer ${added ? "bg-green-500" : "bg-[#187AFF]"}`}
          onClick={() => {
            handleAdd();
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
