import { createContext } from "react";

import type { CartItem, ProductType } from "./Types/Types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductType) => void;
  removeCartItem: (productId: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
