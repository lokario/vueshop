<template>
  <v-card class="pa-3 d-flex align-center w-auto" flat>
    <v-img
      width="50"
      height="50"
      :src="
        cartItem.product.image ??
        'https://api.takeit.ciph3r.co/img/placepic.jpg'
      "
      rounded
    />
    <div class="flex-column w-100 mx-3 overflow-hidden">
      <v-btn
        variant="text"
        color="grey-darken-1"
        size="small"
        density="compact"
        icon="mdi-close"
        class="position-absolute top-0 right-0 ma-2"
        @click="cartStore.removeFromCart(cartItem.product.id)"
      />
      <div class="text-subtitle-1 font-weight-medium text-truncate">
        {{ cartItem.product.name }}
      </div>
      <div class="d-flex justify-space-between">
        <div class="text-subtitle-1 text-grey font-weight-medium">
          ${{ cartItem.product.price }}
        </div>
        <div class="text-subtitle-2 text-grey">#{{ cartItem.quantity }}</div>
      </div>
    </div>
  </v-card>
  <v-divider/>
</template>

<script setup lang="ts">
import CartItem from "@/models/CartItem";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

defineProps({
  cartItem: {
    type: CartItem,
    required: true,
  },
});
</script>
