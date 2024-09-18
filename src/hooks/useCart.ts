import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartItem } from "../types/cart";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return {
    cart: context.cart,
    total: context.getTotal,
    clearCart: context.clearCart,
    updateCart: context.updateCart,
    addItem: (item: CartItem) => {
      context.addToCart(item);
    },
  };
}
