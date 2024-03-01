<template>
  <div class="app">
    <main class="app__container">
      <div class="app__view">
        <div class="app__logo">
          <app-logo :width="220" />
        </div>

        <div class="app__search">
          <search-wrapper>
            <template #append>
              <base-icon-button
                name="menu-alt-right"
                class="app__drawer-button"
                :transparent="true"
                :size="36"
                @click="() => countriesStore.toggleDrawer()"
              />
            </template>
          </search-wrapper>
        </div>
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
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCountriesStore } from "../store/countries";
import { addGestureListeners } from "../store/utils";
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

  // Handling Command + D for drawer toggle
  if (ctrl && event.key === "d") {
    event.preventDefault();
    countriesStore.toggleDrawer();
  }

  // Handling Space key for play/pause
  if (event.key === " ") {
    if (countriesStore.activeChannel) {
      countriesStore.togglePlay();
    }
  }

  // Handling Command + Arrow Right for shuffle
  if (ctrl && event.key === "ArrowRight") {
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

  if (canvas) {
    canvas.addEventListener("dblclick", handleDoubleClick);

    addGestureListeners(canvas, {
      onSwipeRight: () => countriesStore.toggleDrawer(),
      onSwipeLeft: () => {
        if (!countriesStore.autoplay) {
          countriesStore.shuffle();
        }
      },
    });
  }
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
  min-height: 550px;

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

  &__logo {
    display: flex;
    justify-content: center;
  }

  &__search {
    margin-bottom: 16px;
    padding: 16px 0;
    margin: 0 12px 16px;
    border-bottom: 1px solid var(--color-border);
  }

  &__drawer-button {
    min-height: 45px;
    min-width: 45px;
    border-radius: 16px;
    background: var(--color-border);
  }
}
</style>
