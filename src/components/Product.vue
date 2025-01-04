<template>
  <v-sheet class="d-inline-flex flex-column pa-4" rounded="lg" border>
    <v-img
      width="220"
      height="220"
      src="https://api.takeit.ciph3r.co/img/placepic.jpg"
    />
    <div class="product-title mt-4 mb-1">Lorem Ipsum Dolor</div>
    <div class="d-flex align-center text-body-2">
      <v-rating
        :model-value="3.5"
        color="amber-accent-3"
        density="compact"
        :size="26"
        half-increments
        readonly
      />
      (45)
    </div>
    <div class="mt-3 d-flex align-center justify-space-between">
      <div class="d-flex flex-column">
        <span class="text-caption text-grey">Price</span>
        <div class="product-title">$ 315</div>
      </div>
      <!-- <v-btn color="accent" variant="flat"  size="small" icon="mdi-cart-outline" /> -->
      <v-btn color="accent" variant="outlined" size="small">Add to cart</v-btn>
    </div>
  </v-sheet>
</template>

<style>
.product-title {
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
