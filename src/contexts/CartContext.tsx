import { createContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "../types/cart";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  updateCart: (items: CartItem[]) => void;
  getTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => setCart([]);

  const updateCart = (updatedCart: CartItem[]) => setCart(updatedCart);

  const addToCart = (item: CartItem) =>
    setCart((prevCart) => [...prevCart, item]);

  return (
    <CartContext.Provider
      value={{ cart, getTotal, clearCart, updateCart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
