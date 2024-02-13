<template>
  <button :key="`${loading}`" class="channel-button">
    <transition name="play" mode="out-in">
      <base-icon-button v-if="failed" name="unavailable" />
      <base-icon-button v-else-if="loading" name="loading" />
      <base-icon-button v-else-if="playing" name="pause" />
      <base-icon-button v-else name="play" />
    </transition>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  playing: Boolean,
  loading: Boolean,
  failed: Boolean,
});
</script>

<style scoped lang="scss">
.channel-button {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-text-dark);
  color: var(--color-main);
  transition: color 0.25s;
  opacity: 0.8;

  &:hover {
    color: var(--color-text-light);
  }
}
</style>
