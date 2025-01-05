<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item
        prepend-icon="mdi-filter-variant"
        class="font-weight-medium px-10"
      >
        Filters
      </v-list-item>

      <v-divider />

      <v-list-item class="font-weight-medium px-0 px-10">
        Categories
      </v-list-item>

      <!-- First 5 Categories -->
      <div class="categories-list">
        <CategoryItem
          v-for="category in limitedCategories"
          :key="category.id"
          :category="category"
          :selected="category.uuid == categoriesStore.selectedCategory"
          @click="selectCategory(category.uuid)"
        />
      </div>

      <!-- Additional Categories -->
      <transition name="slide-down">
        <div v-if="showAllCategories">
          <CategoryItem
            v-for="category in remainingCategories"
            :key="category.id"
            :category="category"
            :selected="category.uuid == categoriesStore.selectedCategory"
            @click="selectCategory(category.uuid)"
          />
        </div>
      </transition>

      <!-- Additional Categories Toggle -->
      <v-list-item
        density="compact"
        class="mx-3 px-7"
        :title="showAllCategories ? 'Show less' : 'Show more'"
        :append-icon="showAllCategories ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        rounded
        @click="toggleShowAll"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useCategoriesStore } from "@/stores/categoriesStore";
import CategoryItem from "./CategoryItem.vue";
import { useProductsStore } from "@/stores/productsStore";

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const showAllCategories = ref(false);

const toggleShowAll = () =>
  (showAllCategories.value = !showAllCategories.value);
const limitedCategories = computed(
  () => categoriesStore.categories.slice(0, 5) // Split categories into "first 5" and "remaining"
);
const remainingCategories = computed(() => categoriesStore.categories.slice(5));

onMounted(() => {
  categoriesStore.loadCategories();
});

const selectCategory = async (categoryId: string) => {
  categoriesStore.selectedCategory =
    categoriesStore.selectedCategory === categoryId ? "" : categoryId;

  productsStore.searchQuery = "";

  await productsStore.searchProducts();
};
</script>

<style scoped>
.categories-list {
  display: flex;
  flex-direction: column;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}
</style>
