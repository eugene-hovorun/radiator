<template>
  <div
    class="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors hover:text-main"
    :class="{
      'bg-bg text-main': selected,
      'text-text-light': !selected,
    }"
  >
    <div
      class="w-6 h-6 rounded-full"
      :style="`background: ${theme.gradient}`"
    ></div>
    <div>{{ theme.title }}</div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  theme: Theme;
  selected: boolean;
}

defineProps<Props>();
</script>
