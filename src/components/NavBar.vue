<template>
  <v-app-bar
    class="px-5 px-sm-10"
    border="sm"
    height="80"
    :extension-height="40"
    :extended="display.xs.value"
    flat
  >
    <!-- Desktop Layout -->
    <div class="w-100 d-none d-sm-flex align-center">
      <v-img width="140" src="@/assets/logo-full.png" />

      <SearchBar
        class="mx-10"
        :on-search="onSearch"
        :model-value="productsStore.searchQuery"
        placeholder="Search for products"
      />

      <v-btn class="ms-5" icon="mdi-cart-outline" />
    </div>

    <!-- Mobile Layout -->
    <div class="w-100 d-flex d-sm-none flex-column">
      <div class="w-100 mb-3 d-flex justify-space-between">
        <v-app-bar-nav-icon variant="text" @click.stop="productsStore.isDrawerOpen = !productsStore.isDrawerOpen"></v-app-bar-nav-icon>
        <v-img max-width="140" src="@/assets/logo-full.png" />

        <v-btn class="ms-5" icon="mdi-cart-outline" />
      </div>

      <SearchBar
        :on-search="onSearch"
        :model-value="productsStore.searchQuery"
        placeholder="Search for products"
      />
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useProductsStore } from "@/stores/productsStore";
import { useDisplay } from "vuetify";

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const display = useDisplay();

const onSearch = async () => {
  categoriesStore.selectedCategory = "";
  await productsStore.searchProducts();
};
</script>

<style>
@media (max-width: 600px) {
  .v-toolbar__content {
    height: 120px !important;
  }

  .v-toolbar__extension {
    height: 0 !important;
  }
}
</style>
