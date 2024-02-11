<template>
  <div class="bg-bg transition-colors">
    <main class="max-w-[1400px] min-h-[100svh] m-auto pt-6">
      <div class="relative z-[1]">
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
        @error="channel && countriesStore.setFailedChannel(channel)"
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

const handleKeyDown = (event: KeyboardEvent) => {
  const ctrl = event.metaKey || event.ctrlKey;

  // Handling Command + F for search
  if (ctrl && event.key === "f") {
    event.preventDefault();
    countriesStore.toggleSearch(true);
  }

  // Handling Command + D for drawer toggle
  if (ctrl && event.key === "d") {
    event.preventDefault();
    countriesStore.toggleDrawer(true);
  }

  // Handling Escape key for closing search and drawer
  if (event.key === "Escape") {
    countriesStore.toggleSearch(false);
    countriesStore.toggleDrawer(false);
  }

  // Handling Space key for play/pause
  if (event.key === " ") {
    event.preventDefault();

    if (countriesStore.activeChannel) {
      countriesStore.togglePlay();
    }
  }

  // Handling Command + Arrow Right for next channel
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

const handleVisibilityChange = () => {
  visibilityState.value = document.visibilityState;
};

onMounted(() => {
  countriesStore.applyStoredData();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>
