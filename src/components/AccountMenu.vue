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
            <h3>Juan Diaz</h3>
            <p class="text-caption mt-1">test@test.com</p>
            <v-divider class="my-3"></v-divider>
            <v-btn variant="text" rounded> Edit Account </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn variant="text" rounded block @click="authStore.logout()"> Sign out </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";

const authStore = useAuthStore();

const menu = ref(false);
</script>
