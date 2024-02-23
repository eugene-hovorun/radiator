<template>
  <div class="theme" :class="{ selected }">
    <div class="theme__preview" :style="`background: ${theme.gradient}`"></div>
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

<style lang="scss" scoped>
.theme {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  color: var(--color-light);
  font-size: 14px;
  cursor: pointer;
  transition: color 0.25s;

  &:hover {
    color: var(--color-main);
  }

  &.selected {
    background: var(--color-bg);
    color: var(--color-main);
  }

  &__preview {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
}
</style>
