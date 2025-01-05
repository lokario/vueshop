<template>
  <NavBar class="position-fixed" />
  <NavDrawer class="position-fixed" />
  <div
    v-if="productsStore.isLoading"
    class="d-flex flex-wrap justify-center ga-8 pa-8"
  >
    <ProductSkeleton v-for="n in 10" :key="n" />
  </div>

  <v-alert
    v-else-if="productsStore.apiError"
    :text="productsStore.apiError"
    class="ma-8"
    type="error"
  />

  <v-empty-state
    v-else-if="!productsStore.products.length"
    icon="mdi-magnify"
    text="Try adjusting your search terms or filters."
    title="We couldn't find any product."
  />

  <div v-else class="d-flex flex-wrap justify-center ga-8 pa-8">
    <Product
      v-for="product in productsStore.products"
      :key="product.id"
      :product="product"
    />

    <!-- Load More Spinner -->
    <div v-if="productsStore.isFetchingMore" class="text-center py-4">
      <v-progress-circular indeterminate color="accent" />
    </div>

    <!-- Infinite Scroll Trigger -->
    <div ref="loadTrigger" />
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core";
import { useProductsStore } from "@/stores/productsStore";

const productsStore = useProductsStore();
const loadTrigger = ref<HTMLElement | null>(null);

onMounted(() => {
  productsStore.loadProducts();
});

useInfiniteScroll(
  loadTrigger,
  async () => await productsStore.loadProducts(productsStore.currentPage + 1),
  {
    distance: 100,
    canLoadMore: () => productsStore.currentPage < productsStore.lastPage,
  }
);
</script>
