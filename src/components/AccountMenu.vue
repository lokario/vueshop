<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon icon="mdi-cog" />
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="grey">
              <v-icon icon="mdi-account-circle" />
            </v-avatar>

            <h3>{{ authStore.user.name || "Guest" }}</h3>
            <p class="text-caption mt-1">
              {{ authStore.user.email || "No email provided" }}
            </p>

            <v-divider class="my-3" />

            <div class="d-flex text-subtitle-1 align-center">
              Light
              <v-switch
                v-model="isDarkMode"
                density="compact"
                size="small"
                class="mx-5"
                hide-details
              />
              Dark
            </div>

            <v-divider class="my-3" />

            <v-btn variant="text" rounded block @click="authStore.logout()">
              Sign out
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useDark } from "@vueuse/core";
import { ref } from "vue";

const menu = ref(false);
const authStore = useAuthStore();

const isDarkMode = useDark({
  selector: "html",
  attribute: "data-theme",
});
</script>
