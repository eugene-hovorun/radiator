<template>
  <button :disabled="disabled" :style="buttonStyle" :aria-label="label">
    <base-icon :name="name" :size="svgSize" :color="color" />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 30,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "radio-button",
  },
  color: {
    type: String,
    default: "main",
  },
});

const buttonStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  color: `var(--color-${props.color})`,
}));

const svgSize = computed(() => props.size * 0.8);
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  opacity: 0.9;
  transition: 0.25s;

  &:hover:not(:disabled) {
    color: var(--color-light);
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
