import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useProductsStore } from "@/stores/productsStore";
import * as productService from "@/services/productsService";

describe("Products Store - Initial State", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should load products and update the state", async () => {
    const store = useProductsStore();

    // Mock API response
    const mockResponse = {
      data: [
        { id: 1, name: "Test Product 1", price: "100" },
        { id: 2, name: "Test Product 2", price: "200" },
      ],
      meta: { current_page: 1, last_page: 2 },
    };

    vi.spyOn(productService, "fetchProducts").mockResolvedValue(mockResponse);

    await store.loadProducts();

    expect(store.products).toMatchObject([
      { id: 1, name: "Test Product 1", price: "100" },
      { id: 2, name: "Test Product 2", price: "200" },
    ]);
    expect(store.currentPage).toBe(1);
    expect(store.lastPage).toBe(2);
    expect(store.isLoading).toBe(false);
  });

  it("should handle API errors gracefully", async () => {
    const store = useProductsStore();

    vi.spyOn(productService, "fetchProducts").mockRejectedValue(
      new Error("Failed to load products")
    );

    await store.loadProducts();

    expect(store.apiError).toBe("Failed to load products");
    expect(store.products).toEqual([]);
    expect(store.isLoading).toBe(false);
  });

  it("should search products and update the state based on searchQuery", async () => {
    const store = useProductsStore();

    const mockSearchResults = [
      { id: 1, name: "Searched Product 1", price: "150" },
    ];

    const searchMock = vi
      .spyOn(productService, "searchProductsByName")
      .mockImplementation(async (query) => {
        if (query === "Searched") {
          return mockSearchResults;
        }
        return [];
      });

    store.searchQuery = "Searched";
    await store.searchProducts();

    expect(searchMock).toHaveBeenCalledWith("Searched");

    expect(store.products).toMatchObject([
      { id: 1, name: "Searched Product 1", price: "150" },
    ]);

    expect(store.isLoading).toBe(false);
  });
});
