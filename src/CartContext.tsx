import { createContext } from "react";

import type { CartItem, ProductType } from "./Types/Types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductType) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
