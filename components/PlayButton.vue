<template>
  <div class="play-button">
    <transition name="play" mode="out-in">
      <base-icon-button v-if="failed" :size="size" name="unavailable" />
      <base-icon-button v-else-if="loading" :size="size" name="loading" />
      <base-icon-button v-else-if="playing" :size="size" name="pause" />
      <base-icon-button v-else :size="size" name="play" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  playing: Boolean,
  loading: Boolean,
  failed: Boolean,
  size: {
    type: Number,
    default: 30,
  },
});
</script>

<style scoped lang="scss">
.play-button {
  background: var(--color-text-dark);
  border-radius: 50%;
}
</style>
