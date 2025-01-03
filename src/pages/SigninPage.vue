<template>
  <v-sheet class="background w-100 h-screen d-flex align-center justify-center">
    <v-card class="pa-8 ma-4 custom-shadow" width="420" min-width="180" rounded="lg" flat>
      <v-form v-model="isValid">
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
            v-model="email"
            hide-details="auto"
            placeholder="Email"
            prepend-inner-icon="mdi-email-outline"
            density="compact"
            variant="solo"
            rounded="lg"
            flat
            :error="!!emailError"
            @blur="validateEmail"
          />

          <v-divider />

          <v-text-field
            v-model="password"
            hide-details="auto"
            placeholder="Password"
            prepend-inner-icon="mdi-lock-outline"
            density="compact"
            variant="solo"
            rounded="lg"
            flat
            :type="visible ? 'text' : 'password'"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :error="!!passwordError"
            @click:append-inner="visible = !visible"
            @blur="validatePassword"
          />
        </v-sheet>

        <div v-if="emailError || passwordError" class="text-body-2 mt-4 text-red-darken-4">
          {{ emailError || passwordError }}
        </div>

        <GradientButton class="my-8" :disabled="!isValid">
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

<script setup lang="ts">
import { ref } from "vue";

// Reactive variables
const email = ref("");
const password = ref("");
const visible = ref(false);
const isValid = ref(false);

// Validation errors
const emailError = ref("");
const passwordError = ref("");

const validateEmail = () => {
  if (!email.value) {
    emailError.value = "Email is required";
  } else if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = "Email must be valid";
  } else {
    emailError.value = "";
  }
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = "Password is required";
  } else {
    passwordError.value = "";
  }
};

const submitForm = () => {
  validateEmail();
  validatePassword();

  if (!emailError.value && !passwordError.value) {
    isValid.value = true;
    console.log("Form Submitted", { email: email.value, password: password.value });
  } else {
    isValid.value = false;
  }
};
</script>

<style>
.background {
  background: center /cover url("@/assets/pattern2.svg") !important;
}
</style>
