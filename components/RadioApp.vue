<template>
  <div class="bg-bg transition-colors">
    <main class="max-w-[1400px] min-h-screen m-auto pt-6">
      <div class="relative z-[1]">
        <slot />
      </div>

      <lazy-audio-motion
        :src="src"
        :playing="playing"
        :colors="colors"
        :theme="currentThemeValue"
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

const route = useRoute();
const countriesStore = useCountriesStore();
const channel = computed(() => countriesStore.activeChannel);
const src = computed(() => channel.value?.src);
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
  if (event.ctrlKey && event.key === "f") {
    event.preventDefault();
    countriesStore.toggleSearch(true);
  }

  if (event.ctrlKey && event.key === "d") {
    event.preventDefault();
    countriesStore.toggleDrawer(true);
  }

  if (event.key === "Escape") {
    countriesStore.toggleSearch(false);
    countriesStore.toggleDrawer(false);
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
