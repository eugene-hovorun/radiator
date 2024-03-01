<template>
  <div class="shortcuts">
    <div v-for="shortcut in shortcuts" :key="shortcut.label" class="shortcut">
      <div>{{ shortcut.label }}</div>
      <AppShortcut :is="shortcut.is" />
    </div>
  </div>
</template>

<script setup lang="ts">
const shortcuts = ref([
  {
    label: "Sidebar",
    is: "sidebar-mobile",
  },
  {
    label: "Pause/Play",
    is: "pause-mobile",
  },
  {
    label: "Shuffle",
    is: "shuffle-mobile",
  },
  {
    label: "Fullscreen",
    is: "fullscreen-mobile",
  },
]);
</script>

<style lang="scss" scoped>
.shortcuts {
  color: var(--color-light);
  font-size: 14px;
  cursor: default;
  transition: color 0.25s;

  .shortcut {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
  }
}
</style>
