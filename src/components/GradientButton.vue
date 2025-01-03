<template>
  <v-btn
    color="accent"
    size="large"
    type="submit"
    variant="flat"
    :style="gradientStyle"
    block
  >
    <slot />
  </v-btn>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";

const gradients = {
  accent: ["#444CF7", "#8084F9"],
};

const props = defineProps({
  color: {
    type: String as PropType<keyof typeof gradients>,
    required: false,
    default: "accent",
  },
});

const colors = computed(() => gradients[props.color]);

const gradientStyle = computed(() => ({
  color: "white",
  backgroundImage: `linear-gradient(90deg, ${colors.value[0]}, ${colors.value[1]})`,
}));
</script>
