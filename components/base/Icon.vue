<template>
  <span :style="colorStyle">
    <svg :width="size" :height="size">
      <use :href="`#${name}`" />
    </svg>
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 24,
  },
  color: {
    type: String,
    default: "main",
  },
  inheritColor: {
    type: Boolean,
    default: false,
  },
});

const colorStyle = computed(() =>
  props.inheritColor ? {} : { color: `var(--color-${props.color})` },
);
</script>

<style scoped lang="scss">
span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
