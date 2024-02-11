<template>
  <button
    class="flex-shrink-0 rounded-full flex items-center justify-center transition bg-text-dark text-main hover:text-text-light opacity-90 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
    :disabled="disabled"
    :style="style"
  >
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
