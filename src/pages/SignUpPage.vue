<template>
  <v-sheet class="background w-100 h-screen d-flex align-center justify-center">
    <v-card class="pa-8 ma-4 custom-shadow" width="420" min-width="180" rounded="lg" flat>
      <v-form v-model="isValid" @submit="submitForm" @submit.prevent>
        <v-img
          :width="60"
          aspect-ratio="1/1"
          cover
          class="mx-auto my-4"
          src="@/assets/logo.png"
        />

        <div class="text-h5 text-center mb-8 font-weight-medium">
          Sign up your account
        </div>

        <v-sheet rounded="lg" border="opacity-25 sm">
        <v-text-field
            v-model="name"
            hide-details="auto"
            placeholder="Name"
            prepend-inner-icon="mdi-account-outline"
            density="compact"
            variant="solo"
            rounded="lg"
            flat
            :error="!!nameError"
            @blur="validateName"
          />

          <v-divider />

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
          {{ nameError || emailError || passwordError }}
        </div>

        <GradientButton class="my-8" :disabled="!isValid">
          Sign Up
        </GradientButton>

        <p class="text-center">
          Already have an account?
          <router-link to="/signin" class="text-accent font-weight-medium">Sign in</router-link>
        </p>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

// Reactive variables
const name = ref("");
const email = ref("");
const password = ref("");
const visible = ref(false);
const isValid = ref(false);

// Validation errors
const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");

// Stores
const authStore = useAuthStore();

const validateName = () => {
  if (!name.value) {
    nameError.value = "Name is required";
  } else {
    nameError.value = "";
  }
};

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

const formIsValid = computed(() => {
  return !!name.value && !!email.value && !!password.value && !emailError.value && !passwordError.value;
});

const submitForm = async () => {
  validateName();
  validateEmail();
  validatePassword();

  if (!formIsValid.value) {
    console.error("Validation failed");
    return;
  }

  await authStore.signUp(name.value, email.value, password.value);

  if (authStore.apiError) {
    console.error("SignUp failed:", authStore.apiError);
  }
};
</script>

<style scoped>
.background {
  background: center /cover url("@/assets/pattern2.svg") !important;
}
</style>
