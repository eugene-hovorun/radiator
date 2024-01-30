<template>
  <button class="channel-button" :class="{ playing, loading, failed }">
    <transition name="svg" mode="out-in">
      <u-icon v-if="failed" name="iconamoon:unavailable" dynamic />

      <svg v-else-if="loading" viewBox="0 0 42 42" style="width: 60%">
        <circle
          cx="21"
          cy="21"
          r="19"
          fill="none"
          stroke="var(--color-primary)"
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

<style scoped>
.channel-button {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--color-text-dark);
  color: var(--color-primary);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  opacity: 0.8;
}

.channel-button:hover {
  color: var(--color-text-light);
}

.svg-enter-active,
.svg-leave-active {
  transition: 0.3s;
}

.svg-enter {
  transform: scale(1.2);
  opacity: 0.1;
}

.svg-leave-to {
  transform: scale(0.8);
  opacity: 0.1;
}
</style>
