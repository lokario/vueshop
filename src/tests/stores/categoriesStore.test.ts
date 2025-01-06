import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useProductsStore } from "@/stores/productsStore";
import * as categoriesService from "@/services/categoriesService";
import * as productService from "@/services/productsService";

describe("categoriesStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should initialize with empty categories and no selected category", () => {
    const store = useCategoriesStore();
    expect(store.categories).toEqual([]);
    expect(store.selectedCategory).toBe("");
  });

  it("should load categories and update state", async () => {
    const mockCategories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];

    vi.spyOn(categoriesService, "fetchCategories").mockResolvedValue({
      data: mockCategories,
    });

    const store = useCategoriesStore();
    await store.loadCategories();

    expect(store.categories).toEqual(mockCategories);
  });

  it("should handle errors gracefully when loading categories", async () => {
    vi.spyOn(categoriesService, "fetchCategories").mockRejectedValue(
      new Error("API error")
    );

    const store = useCategoriesStore();
    await store.loadCategories();

    expect(store.categories).toEqual([]);
  });

  it("should pass selectedCategory to fetchProducts", async () => {
    const categoriesStore = useCategoriesStore();
    const productsStore = useProductsStore();

    const fetchProductsMock = vi
      .spyOn(productService, "fetchProducts")
      .mockResolvedValue({
        data: [],
        meta: { current_page: 1, last_page: 1 },
      });

    categoriesStore.selectedCategory = "test-category";
    await productsStore.loadProducts();

    expect(fetchProductsMock).toHaveBeenCalledWith(1, "test-category");
  });
});
