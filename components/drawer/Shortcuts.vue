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
    label: "Search",
    is: "search",
  },
  {
    label: "Sidebar",
    is: "sidebar",
  },
  {
    label: "Volume",
    is: "volume",
  },
  {
    label: "Pause/Play",
    is: "pause",
  },
  {
    label: "Shuffle",
    is: "shuffle",
  },
  {
    label: "Theme Switching",
    is: "theme",
  },
  {
    label: "Favorite Switching",
    is: "favorite",
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
