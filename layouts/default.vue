<template>
  <slot />

  <radio-loading v-if="showHideSpinner" />
</template>

<script lang="ts" setup>
const showHideSpinner = ref(true);

onMounted(() => {
  showHideSpinner.value = false;
});
</script>
