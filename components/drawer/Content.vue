<template>
  <div class="drawer-content">
    <lazy-u-accordion :items="items">
      <template #theme>
        <drawer-theme
          v-for="theme in themes"
          :key="theme.value"
          :selected="theme.value === currentThemeValue"
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
    </lazy-u-accordion>

    <lazy-drawer-ios-caption v-if="isIos" />
  </div>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../../store/countries";
import { themes } from "~/assets/themes";

const router = useRouter();
const countriesStore = useCountriesStore();
const favoriteChannels = computed(() => countriesStore.favoriteChannels);
const isIos =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

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
  countriesStore.autoplay = true;
  router.push(url);
};
</script>

<style>
.drawer-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 78px);
  overflow: auto;
}

.drawer-content [type="button"] {
  padding: 8px 12px;
  background-color: transparent;
  color: var(--color-text-light);
  font-size: 1rem;
  font-weight: 600;
}

.drawer-content [type="button"]:hover {
  background-color: transparent;
}

.drawer-content [type="button"] span[class*="icon"] {
  color: var(--color-main);
}
</style>
