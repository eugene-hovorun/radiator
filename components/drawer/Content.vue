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

      <template #favorites>
        <drawer-favorite
          v-for="channel in favoriteChannels"
          :key="channel.id"
          :channel="channel"
          @click="goToChannel(channel.url)"
        />
      </template>
    </u-accordion>
  </div>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../../store/countries";
import { themes } from "~/assets/themes";

const router = useRouter();
const countriesStore = useCountriesStore();
const favoriteChannels = computed(() => countriesStore.favoriteChannels);

const items = [
  {
    label: "Theme",
    icon: "i-heroicons-swatch",
    defaultOpen: false,
    slot: "theme",
  },
  {
    label: "Favorites",
    icon: "i-heroicons-heart",
    defaultOpen: true,
    slot: "favorites",
  },
];

const currentThemeValue = computed({
  get: () => countriesStore.currentThemeValue,
  set: (value) => countriesStore.setTheme(value),
});

const goToChannel = (url: string) => {
  countriesStore.toggleDrawer(false);
  router.push(url);
};
</script>

<style>
.drawer-content {
  height: calc(100vh - 78px);
  overflow: auto;
}

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
