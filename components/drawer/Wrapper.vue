<template>
  <transition name="drawer" mode="out-in">
    <div
      v-if="countriesStore.showDrawer"
      class="drawer__overlay"
      @click.self="closeDrawer"
    >
      <div class="drawer">
        <div class="drawer__header">
          <lazy-app-logo />

          <base-icon-button name="close" @click="closeDrawer" />
        </div>

        <drawer-content />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../../store/countries";

const countriesStore = useCountriesStore();

const closeDrawer = () => {
  countriesStore.toggleDrawer(false);
};
</script>

<style scoped lang="scss">
.drawer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background: var(--color-border);
  transition: transform 0.3s ease-in-out;
  transition: background 0.25s;
  box-shadow: 10px 0 9px var(--color-shadow);

  &__overlay {
    position: fixed;
    z-index: 4;
    inset: 0;
    background: color-mix(in srgb, var(--color-bg) 30%, transparent);
    backdrop-filter: blur(8px);
    transition: background 0.25s;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 16px;
  }
}
</style>
