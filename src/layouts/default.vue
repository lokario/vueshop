<template>
  <v-app>
    <v-theme-provider :theme="theme">
      <v-main>
        <router-view />
      </v-main>
    </v-theme-provider>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDark } from "@vueuse/core";

const isDarkMode = useDark();

const theme = computed(() => (isDarkMode.value ? "dark" : "light"));
</script>
