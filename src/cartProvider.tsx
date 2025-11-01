import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CartItem, ProductType } from "./Types/Types";
import { CartContext } from "./CartContext";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType, size: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.data.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.data.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prev, { quantity: 1, data: product, size }];
      }
    });
  };

  const removeCartItem = (productId: number, size: string) => {
    setCart((prev) => {
      return prev.filter(
        (product) => !(product.data.id === productId && product.size === size)
      );
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
