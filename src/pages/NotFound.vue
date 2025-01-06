<template>
  <div class="h-100 d-flex justify-center">
    <v-container class="d-flex flex-column align-center ma-auto py-16">
      <v-img width="320" src="@/assets/logo-full.png" />
      <p class="text-h1 text-gray my-6">Whoops, 404</p>
      <p class="text-h4">Page not found</p>
      <p class="my-6">Oops! The page you're looking for doesn't exist.</p>
      <GradientButton :block="false" @click="$router.push('/')">
        Go back home
      </GradientButton>
    </v-container>
  </div>
</template>
