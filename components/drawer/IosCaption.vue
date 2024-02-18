<template>
  <div class="ios-caption">
    <div class="ios-caption__header">
      <div class="ios-caption__title">🍏 Audio Visualizer Notice</div>
      <base-icon-button name="close" @click="$emit('close')" />
    </div>
    <p>
      The Audio visualizer feature is unavailable on most
      <span class="accent">iOS</span> devices.
    </p>
    <p>
      Enjoy the music as it is or switch to another platform for the full visual
      experience.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.ios-caption {
  margin: auto 12px 12px;
  padding: 16px 12px;
  background: var(--color-bg);
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text-light);

  &__header {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__title {
    font-weight: bold;
    font-size: 1.25rem;
  }

  p {
    margin-top: 16px;
    margin-bottom: 0;
  }

  .accent {
    color: var(--color-main);
    font-weight: bold;
  }
}
</style>
