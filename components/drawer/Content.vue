<template>
  <div class="drawer-content">
    <lazy-base-accordion id="drawer" :items="items">
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

      <template #shortcuts>
        <drawer-shortcuts />
      </template>
    </lazy-base-accordion>

    <lazy-drawer-ios-caption v-if="isIos()" />
  </div>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../../store/countries";
import { hasTouchScreen, isIos } from "../../store/utils";
import { themes } from "~/assets/themes";

const router = useRouter();
const countriesStore = useCountriesStore();
const favoriteChannels = computed(() => countriesStore.favoriteChannels);

const themeSection = {
  icon: "swatch",
  label: "Theme",
  active: false,
  slot: "theme",
};

const favoriteSection = {
  icon: "heart-outline",
  label: "Favorites",
  active: true,
  slot: "favorites",
};

const shortcutsSection = {
  icon: "keyboard",
  label: "Shortcuts",
  active: false,
  slot: "shortcuts",
};

const items = ref<AccordionContent[]>(
  hasTouchScreen()
    ? [themeSection, favoriteSection]
    : [themeSection, favoriteSection, shortcutsSection],
);

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

<style lang="scss">
.drawer-content {
  display: flex;
  flex-direction: column;
  height: calc(100svh - 78px);
  overflow: auto;
}
</style>
