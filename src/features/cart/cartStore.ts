import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../../types/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        const existing = get().cart.find((item) => item.id === product.id);

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity }],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },

      clearCart: () => set({ cart: [] }),

      increaseQty: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decreaseQty: (id) => {
        set({
          cart: get().cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export const getTotalItems = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.quantity, 0);

export function getTotalPrice(cart: CartItem[]) {
  return cart.reduce((total, item) => {
    const actualPrice = item.discountedPrice < item.price
      ? item.discountedPrice
      : item.price;

    return total + actualPrice * item.quantity;
  }, 0);
}

