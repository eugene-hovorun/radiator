<template>
  <main>
    <div class="sliders-z-index">
      <slot />
    </div>

    <radio-motion
      :src="src"
      :playing="playing"
      :colors="colors"
      @loaded="countriesStore.loadingChannelId = null"
      @play="handlePlay"
      @error="channel && countriesStore.setFailedChannel(channel)"
    />

    <radio-bar />

    <radio-drawer />
  </main>
</template>

<script setup lang="ts">
import { useCountriesStore } from "../store/countries";

const route = useRoute();
const countriesStore = useCountriesStore();
const channel = computed(() => countriesStore.activeChannel);
const src = computed(() => channel.value?.src);
const playing = computed(() => countriesStore.playing);

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
</script>
