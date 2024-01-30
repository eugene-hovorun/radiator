<template>
  <div class="drawer-content">
    <u-accordion :items="items">
      <template #theme>
        <drawer-theme
          v-for="theme in themes"
          :key="theme.value"
          :class="{ active: theme.value === currentThemeValue }"
          :theme="theme"
          @click="currentThemeValue = theme.value"
        />
      </template>

      <!-- <template #favorites> favorites </template> -->
    </u-accordion>
  </div>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../../store/countries";
import { themes } from "~/assets/themes";

const countriesStore = useCountriesStore();

const items = [
  {
    label: "Theme",
    icon: "i-heroicons-swatch",
    defaultOpen: true,
    slot: "theme",
  },
  // {
  //   label: "Favorites",
  //   icon: "i-heroicons-heart",
  //   defaultOpen: false,
  //   slot: "favorites",
  // },
];

const currentThemeValue = computed({
  get: () => countriesStore.currentThemeValue,
  set: (value) => countriesStore.setTheme(value),
});
</script>

<style>
.drawer-content [type="button"] {
  padding: 8px 12px;
  background-color: transparent;
  color: var(--color-text-light);
}

.drawer-content [type="button"]:hover {
  background-color: transparent;
}

.drawer-content [type="button"] span[class*="icon"] {
  color: var(--color-primary);
}
</style>
