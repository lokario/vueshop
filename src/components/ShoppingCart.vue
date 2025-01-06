<template>
  <v-navigation-drawer
    v-model="cartStore.isCartOpen"
    location="right"
    temporary
    width="320"
  >
    <template #prepend>
      <v-list-item
        prepend-icon="mdi-cart-outline"
        class="font-weight-medium px-10 py-4"
      >
        Shopping Cart
      </v-list-item>

      <v-divider />
    </template>

    <v-list>
      <CartItem
        v-for="item in cartStore.cartItems"
        :key="item.product.id"
        :cart-item="item"
        class="ma-5"
      />
    </v-list>

    <template #append>
      <v-sheet class="pa-4" color="grey-lighten-4">
        <div class="d-flex align-center justify-space-between">
          <div class="text-subtitle-2 font-weight-medium">Total price:</div>
          <div class="text-subtitle-1 font-weight-medium">${{ cartStore.totalPrice }}</div>
        </div>
        <GradientButton class="mt-4" rounded="lg" density="comfortable">Checkout</GradientButton>
      </v-sheet>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
</script>
