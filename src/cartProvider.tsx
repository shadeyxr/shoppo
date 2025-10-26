import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CartItem, ProductType } from "./Types/Types";
import { CartContext } from "./CartContext";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.data.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.data.id === product.id ? { ...i, quantity: i.quantity++ } : i
        );
      } else {
        return [...prev, { quantity: 1, data: product }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
