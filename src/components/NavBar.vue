<template>
  <v-app-bar class="px-10" border="sm" height="78" flat>
    <template #prepend>
      <v-img width="120" src="@/assets/logo-full.png" />
    </template>

    <v-text-field
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
    />

    <template #append>
      <v-btn class="ms-5" icon="mdi-cart-outline" />
    </template>
  </v-app-bar>
</template>
