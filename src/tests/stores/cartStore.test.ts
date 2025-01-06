import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/stores/cartStore";
import type Product from "@/models/Product";

describe("cartStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should add a product to the cart", () => {
    const store = useCartStore();
    const product: Product = {
      id: 1,
      name: "Test Product",
      price: "100",
    } as Product;

    store.addToCart(product);

    expect(store.cartItems).toHaveLength(1);
    expect(store.cartItems[0]).toMatchObject({ product, quantity: 1 });
  });

  it("should increase quantity when adding the same product", () => {
    const store = useCartStore();
    const product: Product = {
      id: 1,
      name: "Test Product",
      price: "100",
    } as Product;

    store.addToCart(product);
    store.addToCart(product);

    expect(store.cartItems).toHaveLength(1);
    expect(store.cartItems[0].quantity).toBe(2);
  });

  it("should remove a product from the cart", () => {
    const store = useCartStore();
    const product: Product = {
      id: 1,
      name: "Test Product",
      price: "100",
    } as Product;

    store.addToCart(product);
    store.removeFromCart(product.id);

    expect(store.cartItems).toHaveLength(0);
  });

  it("should calculate total items and total price", () => {
    const store = useCartStore();
    const product1: Product = {
      id: 1,
      name: "Product 1",
      price: "100",
    } as Product;
    const product2: Product = {
      id: 2,
      name: "Product 2",
      price: "200",
    } as Product;

    store.addToCart(product1);
    store.addToCart(product2);
    store.addToCart(product1);

    expect(store.totalItems).toBe(3);
    expect(store.totalPrice).toBe(400);
  });
});
