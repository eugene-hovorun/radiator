<template>
  <slot />
  <radio-loading v-if="showSpinner" />
</template>

<script lang="ts" setup>
const showSpinner = ref(true);

onMounted(() => {
  showSpinner.value = false;
});
</script>
