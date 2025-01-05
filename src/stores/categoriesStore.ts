import Category, { mapCategories } from "@/models/Category";
import { fetchCategories } from "@/services/categoriesService";
import { handleApiError } from "@/services/errorHandler";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", () => {
  // State
  const categories = ref<Category[]>([]);
  const selectedCategory = ref<string>("");
  const isLoading = ref(false);
  const apiError = ref<string>("");

  // Actions
  const loadCategories = async () => {
    isLoading.value = true;
    apiError.value = "";

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const { data } = await fetchCategories();
      categories.value = mapCategories(data);
    } catch (error) {
      apiError.value = handleApiError(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    categories,
    selectedCategory,
    isLoading,
    apiError,
    loadCategories,
  };
});
