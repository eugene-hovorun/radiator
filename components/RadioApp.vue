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
  </main>
</template>

<script setup lang="ts">
import "~/assets/main.css";
import { useCountriesStore } from "../store/countries";

useHead({
  title: "Radiätor",
  style: [{ innerHTML: "html { background: var(--color-bg); }" }],
});

useSeoMeta({
  title: "Radiator",
  ogTitle: "Radiator",
  description:
    "App that lets you listen to radio stations from around the world.",
  ogDescription:
    "App that lets you listen to radio stations from around the world.",
  ogImage: "/og.png",
  twitterCard: "summary_large_image",
});

const route = useRoute();
const countriesStore = useCountriesStore();
const channel = computed(() => countriesStore.activeChannel);
const src = computed(() => channel.value?.src);
const playing = computed(() => countriesStore.playing);

const colors = computed(() => {
  const countries = countriesStore.countries;
  const param = route.params.country;
  const country = countries.find((c) => c.slug === param);

  return country?.colors || [];
});

const handlePlay = () => {
  if (channel.value) {
    countriesStore.playingChannelId = channel.value.id;
    countriesStore.togglePlay(true);
  }
};
</script>
