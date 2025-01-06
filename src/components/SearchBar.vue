<template>
  <v-form @submit.prevent="onSearch" class="w-100">
    <v-text-field
      :v-model="modelValue"
      variant="solo"
      :bg-color="bgColor"
      prepend-inner-icon="mdi-magnify"
      :placeholder="placeholder"
      hide-details="auto"
      density="compact"
      rounded="lg"
      clearable
      flat
      @submit="onSearch"
      @click:clear="onSearch"
    />
  </v-form>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "Search for products",
  },
  onSearch: {
    type: Function as PropType<() => void>,
    required: true,
  },

});

const isDarkMode = useDark();

const bgColor = computed(() => (isDarkMode.value ? "grey-darken-3" : "grey-lighten-3"));
</script>
