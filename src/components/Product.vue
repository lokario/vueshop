<template>
  <v-sheet class="d-inline-flex flex-column pa-4" rounded="lg" border>
    <v-img
      width="220"
      height="220"
      :src="product.image ?? 'https://api.takeit.ciph3r.co/img/placepic.jpg'"
    />
    <div class="product-title mt-4 mb-1 text-no-wrap text-truncate">{{ product.name }}</div>
    <div class="d-flex align-center text-body-2">
      <v-rating
        :model-value="product.rating"
        color="amber-accent-3"
        density="compact"
        :size="26"
        half-increments
        readonly
      />
      ({{ product.punctuation ?? 0}})
    </div>
    <div class="mt-3 d-flex align-center justify-space-between">
      <div class="d-flex flex-column">
        <span class="text-caption text-grey">Price</span>
        <div class="product-price">${{ product.price }}</div>
      </div>
      <!-- <v-btn color="accent" variant="flat"  size="small" icon="mdi-cart-outline" /> -->
      <v-btn color="accent" variant="outlined" size="small" @click="cartStore.addToCart(product)">Add to cart</v-btn>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
import Product from '@/models/Product';
import { useCartStore } from '@/stores/cartStore';

const props = defineProps<{ product: Product }>();
const cartStore = useCartStore();

</script>

<style>
.product-title {
  width: 220px;
}

.product-title, .product-price {
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
