<template>
  <v-list-item
    color="accent"
    density="compact"
    :title="category.name"
    :value="category.uuid"
    class="mx-3 px-7"
    :active="selected"
    :append-icon="selected ? 'mdi-close' : ''"
    rounded
  />
</template>

<script lang="ts" setup>
import type Category from "@/models/Category";

const props = defineProps<{
  category: Category;
  selected: boolean;
}>();
</script>


