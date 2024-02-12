<template>
  <button :disabled="disabled" :style="style">
    <u-icon :name="name" dynamic />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "1",
  },
  disabled: Boolean,
});

const style = computed(() => {
  const size = parseFloat(props.size);
  const width = size * 30;
  const fontSize = size * 24;

  return {
    width: `${width}px`,
    height: `${width}px`,
    fontSize: `${fontSize}px`,
  };
});
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-text-dark);
  color: var(--color-main);
  opacity: 0.9;
  transition:
    opacity 0.25s,
    color 0.25s;

  &:hover {
    color: var(--color-text-light);
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
