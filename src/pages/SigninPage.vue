<template>
  <v-sheet class="background w-100 h-screen d-flex align-center justify-center">
    <v-card class="pa-8 ma-4 custom-shadow" width="420" min-width="180" rounded="lg" flat>
      <v-form>
        <v-img
          :width="60"
          aspect-ratio="1/1"
          cover
          class="mx-auto my-4"
          src="@/assets/logo.png"
        />

        <div class="text-h5 text-center mb-8 font-weight-medium">
          Sign in to your account
        </div>

        <v-sheet rounded="lg" border="opacity-25 sm">
          <v-text-field
            hide-details="auto"
            placeholder="Email"
            density="compact"
            variant="solo"
            rounded="lg"
            flat
          />

          <v-divider />

          <v-text-field
            hide-details="auto"
            placeholder="Password"
            density="compact"
            variant="solo"
            rounded="lg"
            flat
          />
        </v-sheet>

        <GradientButton class="my-8">
          Sign In
        </GradientButton>

        <p class="text-center">
          Don't have an account?
          <a class="text-accent font-weight-medium">Sign up</a>
        </p>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style>
.background {
  background: center /cover url("@/assets/pattern2.svg") !important;
}
</style>
