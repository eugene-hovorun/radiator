<template>
  <button class="icon-button" :style="style">
    <u-icon :name="props.name" dynamic />
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

<style scoped>
.icon-button {
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-text-dark);
  color: var(--color-primary);
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0.9;
  transition: 0.3s;
}

.icon-button:hover {
  opacity: 1;
  color: var(--color-text-light);
}
</style>
