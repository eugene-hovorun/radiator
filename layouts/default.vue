<template>
  <slot v-if="!showSpinner" />

  <transition name="skeleton">
    <radio-loading v-if="showSpinner" />
  </transition>
</template>

<script lang="ts" setup>
import "~/assets/main.css";

const showSpinner = ref(true);

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

onMounted(() => {
  showSpinner.value = false;
});
</script>
