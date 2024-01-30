<template>
  <div class="theme">
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
}

defineProps<Props>();
</script>

<style scoped>
.theme {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: transparent;
  color: var(--color-text-light);
  cursor: pointer;
  transition: color 0.3s;
}

.theme:hover {
  color: var(--color-primary);
}

.theme.active {
  background: var(--color-bg);
  color: var(--color-primary);
}
</style>
