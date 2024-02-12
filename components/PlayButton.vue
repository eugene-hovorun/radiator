<template>
  <button :key="`${loading}`" class="channel-button">
    <transition name="play" mode="out-in">
      <u-icon v-if="failed" name="iconamoon:unavailable" dynamic />

      <svg v-else-if="loading" viewBox="0 0 42 42" style="width: 60%">
        <circle
          cx="21"
          cy="21"
          r="19"
          fill="none"
          stroke="var(--color-main)"
          stroke-width="4"
          stroke-dasharray="10 5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="4s"
            values="0 21 21;360 21 21"
          ></animateTransform>
        </circle>
      </svg>

      <u-icon v-else-if="playing" name="carbon:pause-filled" dynamic />

      <u-icon v-else name="iconoir:play-solid" dynamic />
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
