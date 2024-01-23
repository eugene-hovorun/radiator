<template>
  <main>
    <slot />

    <radio-motion
      :src="src"
      :playing="playing"
      @loaded="countriesStore.loadingChannelId = null"
      @play="handlePlay"
      @error="channel && countriesStore.setFailedChannel(channel)"
    />
  </main>
</template>

<script setup lang="ts">
import "~/assets/main.css";
import { useCountriesStore } from "../store/countries";

useHead({
  title: "Radiätor",
  style: [{ innerHTML: "html { background: #222C35; }" }],
});

useSeoMeta({
  title: "Radiator",
  ogTitle: "Radiator",
  description:
    "App that lets you listen to radio stations from around the world.",
  ogDescription:
    "App that lets you listen to radio stations from around the world.",
  ogImage:
    "https://github.com/hvianna/audioMotion-analyzer/blob/master/img/gradient-steelblue.png?raw=true",
  twitterCard: "summary_large_image",
});

const countriesStore = useCountriesStore();
const channel = computed(() => countriesStore.activeChannel);
const src = computed(() => channel.value?.src);
const playing = computed(() => countriesStore.playing);

const handlePlay = () => {
  if (channel.value) {
    countriesStore.playingChannelId = channel.value.id;
    countriesStore.togglePlay(true);
  }
};
</script>
