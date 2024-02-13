<template>
  <slot v-if="!showSpinner" />

  <transition name="skeleton">
    <app-loading v-if="showSpinner" />
  </transition>

  <speed-insights />
</template>

<script lang="ts" setup>
import "~/assets/main.scss";
import { SpeedInsights } from "@vercel/speed-insights/vue";

const showSpinner = ref(true);

useHead({
  title: "Radiätor",
  style: [{ innerHTML: "html { background: #111; }" }],
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1",
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
</script>
