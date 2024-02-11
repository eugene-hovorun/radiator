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
  // Handling Command + F for search
  if ((event.metaKey || event.ctrlKey) && event.key === "f") {
    event.preventDefault();
    countriesStore.toggleSearch(true);
  }

  // Handling Command + D for drawer toggle
  if ((event.metaKey || event.ctrlKey) && event.key === "d") {
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
    countriesStore.togglePlay();
  }

  // Handling Arrow Right for next channel
  if (event.key === "ArrowRight") {
    countriesStore.shuffle();
  }

  // Handling option/alt + digit for theme change
  if (event.altKey && !isNaN(parseInt(event.key))) {
    event.preventDefault();

    const index = parseInt(event.key) - 1;
    const theme = themes[index];

    if (theme) {
      countriesStore.setTheme(theme.value);
    }
  }

  // Handling digit for favorite channel selection
  if (!event.altKey && !isNaN(parseInt(event.key))) {
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

onMounted(() => {
  countriesStore.applyStoredData();

  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>
