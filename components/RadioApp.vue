<template>
  <div class="app">
    <main class="app__container">
      <div class="app__view">
        <slot />
      </div>

      <lazy-audio-motion
        :src="src"
        :playing="playing"
        :colors="colors"
        :theme="currentThemeValue"
        :volume="volume"
        :visibility="visibilityState"
        @loaded="countriesStore.loadingChannelId = null"
        @play="handlePlay"
        @error="handleError"
      />

      <radio-bar />

      <lazy-drawer-wrapper />

      <lazy-search-wrapper />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCountriesStore } from "../store/countries";
import { themes } from "~/assets/themes";

const route = useRoute();
const router = useRouter();
const countriesStore = useCountriesStore();
const channel = computed(() => countriesStore.activeChannel);
const src = computed(() => channel.value?.src);
const volume = computed(() => countriesStore.volume);
const playing = computed(() => countriesStore.playing);
const currentThemeValue = computed(() => countriesStore.currentThemeValue);
const visibilityState = ref("visible");

const colors = computed(() => {
  const countries = countriesStore.countries;
  const param = route.params.country;
  const country = countries.find((c) => c.id === param);

  return country?.colors || [];
});

const handlePlay = () => {
  if (channel.value) {
    countriesStore.playingChannelId = channel.value.id;
    countriesStore.togglePlay(true);
  }
};

const handleError = () => {
  if (channel.value) {
    countriesStore.setFailedChannel(channel.value);
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  const ctrl = event.metaKey || event.ctrlKey;

  // Handling Command + F for search
  if (ctrl && event.key === "f") {
    event.preventDefault();
    countriesStore.toggleSearch();
  }

  // Handling Command + D for drawer toggle
  if (ctrl && event.key === "d") {
    event.preventDefault();
    countriesStore.toggleDrawer();
  }

  // Handling Space key for play/pause
  if (event.key === " ") {
    event.preventDefault();

    if (countriesStore.activeChannel) {
      countriesStore.togglePlay();
    }
  }

  // Handling Arrow Right for next channel
  if (event.key === "ArrowRight") {
    if (!countriesStore.autoplay) {
      countriesStore.shuffle();
    }
  }

  // Handling Command + digit for theme change
  if (ctrl && !isNaN(parseInt(event.key))) {
    event.preventDefault();

    const index = parseInt(event.key) - 1;
    const theme = themes[index];

    if (theme) {
      countriesStore.setTheme(theme.value);
    }
  }

  // Handling digit for favorite channel selection
  if (!ctrl && !isNaN(parseInt(event.key))) {
    const index = parseInt(event.key) - 1;
    const channel = countriesStore.favoriteChannels[index];

    if (channel) {
      countriesStore.toggleDrawer(false);
      countriesStore.autoplay = true;
      router.push(channel.url);
    }
  }

  // Handling Arrow Up for volume increase
  if (event.key === "ArrowUp") {
    event.preventDefault();
    countriesStore.setVolume(Math.min(countriesStore.volume + 0.05, 1));
  }

  // Handling Arrow Down for volume decrease
  if (event.key === "ArrowDown") {
    event.preventDefault();
    countriesStore.setVolume(Math.max(countriesStore.volume - 0.05, 0));
  }
};

const handleDoubleClick = () => {
  countriesStore.toggleFullScreen();
};

const handleVisibilityChange = () => {
  visibilityState.value = document.visibilityState;
};

onMounted(() => {
  const canvas = document.querySelector("#canvas-container") as HTMLElement;

  countriesStore.applyStoredData();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  canvas?.addEventListener("dblclick", handleDoubleClick);
});

onUnmounted(() => {
  const canvas = document.querySelector("#canvas-container") as HTMLElement;

  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  canvas?.removeEventListener("dblclick", handleDoubleClick);
});
</script>

<style scoped lang="scss">
.app {
  background: var(--color-bg);
  transition: background 0.25s;
  min-height: 400px;

  &__container {
    max-width: 1400px;
    min-height: 100svh;
    margin: auto;
    padding-top: 24px;
  }

  &__view {
    position: relative;
    z-index: 1;
  }
}
</style>
