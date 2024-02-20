<template>
  <button
    :disabled="disabled"
    :class="{ transparent }"
    :style="buttonStyle"
    :aria-label="label"
  >
    <svg :width="svgSize" :height="svgSize">
      <use :href="`#${name}`" />
    </svg>
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
  transparent: {
    type: Boolean,
    default: false,
  },
});

const buttonStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
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
  color: var(--color-main);
  opacity: 0.9;
  transition: 0.25s;

  &:not(.transparent) {
    background: var(--color-dark);
  }

  &:hover {
    color: var(--color-light);
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
