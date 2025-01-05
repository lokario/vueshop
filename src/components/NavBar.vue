<template>
  <v-app-bar class="px-10" border="sm" height="78" flat>
    <template #prepend>
      <v-img width="140" src="@/assets/logo-full.png" />
    </template>

    <v-form @submit.prevent="onSearch" class="w-100">
      <v-text-field
        v-model="productsStore.searchQuery"
        variant="solo"
        bg-color="grey-lighten-3"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search for products"
        hide-details="auto"
        density="compact"
        class="mx-10"
        rounded="lg"
        clearable
        flat
        @submit="onSearch"
        @click:clear="onSearch"
      />
    </v-form>

    <template #append>
      <v-btn class="ms-5" icon="mdi-cart-outline" />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/productsStore";

const productsStore = useProductsStore();

const onSearch = async () => await productsStore.searchProducts();
</script>
