<template>
  <div class="drawer-content">
    <u-accordion :items="items">
      <template #theme> theme </template>

      <template #favorites> favorites </template>
    </u-accordion>
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    label: "Theme",
    icon: "i-heroicons-swatch",
    defaultOpen: true,
    slot: "theme",
  },
  {
    label: "Favorites",
    icon: "i-heroicons-heart",
    defaultOpen: false,
    slot: "favorites",
  },
];
</script>

<style>
.drawer-content [type="button"] {
  background-color: transparent;
  color: var(--color-text-light);
}

.drawer-content [type="button"] span[class*="icon"] {
  color: var(--color-primary);
}
</style>
