import { createContext } from "react";

import type { CartItem, ProductType } from "./Types/Types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductType, size:string) => void;
  removeCartItem: (productId: number, size:string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
