<template>
  <main>
    <slot />

    <radio-motion
      :src="src"
      :playing="playing"
      @loaded="countriesStore.loadingChannelSlug = null"
      @play="handlePlay"
      @error="channel && countriesStore.setFailedChannel(channel)"
    />
  </main>
</template>

<script setup lang="ts">
import "~/assets/main.css";
import { useCountriesStore } from "../store/countries";

const countriesStore = useCountriesStore();
const channel = computed(() => countriesStore.activeChannel);
const src = computed(() => channel.value?.src);
const playing = computed(() => countriesStore.playing);

const handlePlay = () => {
  if (channel.value) {
    countriesStore.playingChannelSlug = channel.value.slug;
    countriesStore.togglePlay(true);
  }
};
</script>
