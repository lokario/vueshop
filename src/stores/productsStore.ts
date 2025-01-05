import { defineStore } from "pinia";
import Product, { mapProducts } from "@/models/Product";
import {
  fetchProducts,
  searchProductsByName,
} from "@/services/productsService";
import { handleApiError } from "@/services/errorHandler";

export const useProductsStore = defineStore("products", () => {
  // State
  const currentPage = ref(1);
  const lastPage = ref(1);
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const isFetchingMore = ref(false);
  const apiError = ref<string>("");
  const searchQuery = ref<string>("");

  // Actions
  const loadProducts = async (page = 1) => {
    if (page > lastPage.value) return;

    // If search query is set, don't load
    if (searchQuery.value) return;

    // Set loading state only for the first page to avoid loading issues
    isLoading.value = page === 1;
    isFetchingMore.value = page > 1;
    apiError.value = "";

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const { data, meta } = await fetchProducts(page);
      const newProducts = mapProducts(data);

      if (page === 1) {
        products.value = newProducts; // Replace products on first load
      } else {
        products.value = [...products.value, ...newProducts]; // Append new products on subsequent pages
      }

      currentPage.value = meta.current_page;
      lastPage.value = meta.last_page;
    } catch (error) {
      apiError.value = handleApiError(error);
    } finally {
      isLoading.value = false;
      isFetchingMore.value = false;
    }
  };

  const searchProducts = async () => {
    isLoading.value = true;
    apiError.value = "";

    // If no search query, load all products
    if (!searchQuery.value) {
      loadProducts();
      return;
    }

    try {
      const filteredProducst = await searchProductsByName(searchQuery.value);
      products.value = mapProducts(filteredProducst);
    } catch (error) {
      apiError.value = "Failed to search products.";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    currentPage,
    lastPage,
    products,
    isLoading,
    isFetchingMore,
    apiError,
    searchQuery,
    loadProducts,
    searchProducts,
  };
});
