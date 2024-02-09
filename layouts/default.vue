<template>
  <slot v-if="!showSpinner" />

  <transition name="skeleton">
    <app-loading v-if="showSpinner" />
  </transition>
</template>

<script lang="ts" setup>
import "~/assets/main.scss";

const showSpinner = ref(true);

useHead({
  title: "Radiätor",
  style: [{ innerHTML: "html { background: #111; }" }],
  script: [{ src: "https://www.googletagmanager.com/gtag/js?id=G-7DC0E80PQR" }],
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
