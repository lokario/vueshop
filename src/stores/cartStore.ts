import type CartItem from "@/models/CartItem";
import type Product from "@/models/Product";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  // State
  const cartItems = useStorage<CartItem[]>("cart-items", []);
  const isCartOpen = ref(false);

  // Getters
  const totalItems = computed(() =>
    cartItems.value.reduce((acc: number, item: CartItem) => {
      return acc + item.quantity;
    }, 0)
  );

  const totalPrice = computed(() =>
    cartItems.value.reduce((acc: number, item: CartItem) => {
      return acc + +item.product.price * item.quantity;
    }, 0)
  );

  // Actions
  const addToCart = (product: Product) => {
    const existingItem = cartItems.value.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) existingItem.quantity++;
    else cartItems.value = [...cartItems.value, { product, quantity: 1 }];
  };

  const removeFromCart = (productId: number) => {
    const existingItem = cartItems.value.find(
      (item) => item.product.id === productId
    );

    if (existingItem) {
      existingItem.quantity--;

      // Remove the item if the quantity becomes 0
      if (existingItem.quantity === 0) {
        cartItems.value = cartItems.value.filter(
          (item) => item.product.id !== productId
        );
      }
    }
  };

  return {
    cartItems,
    isCartOpen,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
  };
});
