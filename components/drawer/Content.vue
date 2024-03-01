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
        <template v-if="favoriteChannels.length">
          <drawer-favorite
            v-for="channel in favoriteChannels"
            :key="channel.id"
            :channel="channel"
            @click="() => goToChannel(channel.url)"
          />
        </template>
        <template v-else>
          <div class="empty-favorites">
            <base-icon-button name="heart" :size="24" transparent />
            <div>Favorite channels appear here</div>
          </div>
        </template>
      </template>

      <template #shortcuts>
        <drawer-shortcuts />
      </template>

      <template #gestures>
        <drawer-gestures />
      </template>
    </lazy-base-accordion>

    <lazy-drawer-ios-caption
      v-if="countriesStore.showIOSCaption && isIos()"
      @close="() => countriesStore.closeIOSCaption()"
    />
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
  active: !favoriteChannels.value.length,
  slot: "theme",
};

const favoriteSection = {
  icon: "heart-outline",
  label: "Favorites",
  active: !!favoriteChannels.value.length,
  slot: "favorites",
};

const shortcutsSection = {
  icon: "keyboard",
  label: "Shortcuts",
  active: false,
  slot: "shortcuts",
};

const gestureSection = {
  icon: "touch",
  label: "Gestures",
  active: false,
  slot: "gestures",
};

const items = ref<AccordionContent[]>(
  hasTouchScreen()
    ? [themeSection, favoriteSection, gestureSection]
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

.empty-favorites {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 8px 12px;
  color: var(--color-light);
  font-size: 12px;
  opacity: 0.5;
}
</style>
