<template>
  <transition name="drawer" mode="out-in">
    <div
      v-if="countriesStore.showDrawer"
      class="fixed z-[4] inset-0 bg-bg/30 backdrop-blur transition-colors"
      @click.self="closeDrawer"
    >
      <div
        class="drawer bg-border transition-colors shadow-[10px_0_9px_var(--color-shadow)]"
      >
        <div class="drawer-header">
          <lazy-app-logo />

          <base-icon-button name="ion:close" @click="closeDrawer" />
        </div>

        <drawer-content />
      </div>

      <drawer-actions />
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

<style>
.drawer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px;
}
</style>
