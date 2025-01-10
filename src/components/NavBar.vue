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
      <v-img width="140" :src="logo" />

      <SearchBar
        v-model="productsStore.searchQuery"
        class="mx-10"
        :on-search="onSearch"
        placeholder="Search for products"
      />

      <v-btn
        class="text-none"
        stacked
        rounded="circle"
        size="large"
        @click.stop="cartStore.isCartOpen = !cartStore.isCartOpen"
      >
        <v-badge
          v-if="cartStore.totalItems > 0"
          color="error"
          :content="cartStore.totalItems"
        >
          <v-icon>mdi-cart-outline</v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart-outline</v-icon>
      </v-btn>

      <AccountMenu />
    </div>

    <!-- Mobile Layout -->
    <div class="w-100 d-flex d-sm-none flex-column">
      <div class="w-100 mb-3 d-flex align-center justify-space-between">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="productsStore.isDrawerOpen = !productsStore.isDrawerOpen"
        />
        <v-img max-width="140" src="@/assets/logo-full.png" />

        <v-btn
          class="text-none"
          stacked
          rounded="circle"
          density="compact"
          size="small"
          @click.stop="cartStore.isCartOpen = !cartStore.isCartOpen"
        >
          <v-badge
            v-if="cartStore.totalItems > 0"
            color="error"
            :content="cartStore.totalItems"
          >
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
          <v-icon v-else>mdi-cart-outline</v-icon>
        </v-btn>

        <AccountMenu />
      </div>

      <SearchBar
        v-model="productsStore.searchQuery"
        :on-search="onSearch"
        placeholder="Search for products"
      />
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useProductsStore } from "@/stores/productsStore";
import { useDark } from "@vueuse/core";
import { useDisplay } from "vuetify";

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const cartStore = useCartStore();
const display = useDisplay();
const isDarkMode = useDark();

const logo = computed(() =>
  isDarkMode.value
    ? new URL("@/assets/logo-light.png", import.meta.url).href
    : new URL("@/assets/logo-full.png", import.meta.url).href
);

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
