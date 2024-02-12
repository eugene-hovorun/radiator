<template>
  <u-range
    :model-value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    class="base-range"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
interface Props {
  modelValue: number;
  min: number;
  max: number;
  step: number;
}

defineProps<Props>();
defineEmits(["update:modelValue"]);
</script>

<style lang="scss">
.base-range {
  .bg-primary-500 {
    background-color: var(--color-main);
  }

  .text-primary-500 {
    color: var(--color-main);
  }

  input:focus-visible {
    box-shadow: none;
  }
}
</style>
