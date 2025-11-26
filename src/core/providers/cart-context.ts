import { createContext } from "react";
import type { CartEntity } from "@/features/cart/entities";
import type { MenuEntity } from "@/features/menu/entities";

interface CartContextValue {
  cart: CartEntity[];
  addToCart: (item: MenuEntity) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

