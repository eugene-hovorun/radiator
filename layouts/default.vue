<template>
  <slot v-if="!showSpinner" />

  <transition name="skeleton">
    <app-loading v-if="showSpinner" />
  </transition>

  <speed-insights />
  <app-icon-sprite />
</template>

<script lang="ts" setup>
import "~/assets/main.scss";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { useCountriesStore } from "../store/countries";

const showSpinner = ref(true);
const countriesStore = useCountriesStore();

watch(
  () => countriesStore.activeChannel,
  (channel) => {
    document.title = getTitle(document.title, channel?.title);
  },
);

useHead({
  htmlAttrs: {
    lang: "en",
  },
  style: [{ innerHTML: "html { background: #212121; }" }],
  titleTemplate: (title) =>
    getTitle(title, countriesStore.activeChannel?.title),
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
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

onMounted(() => {
  showSpinner.value = false;
});

const getTitle = (title: string = "Radiator", channel?: string) => {
  return channel ? `Radiator | ${channel}` : title;
};
</script>
