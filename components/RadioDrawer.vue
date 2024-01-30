<template>
  <transition name="drawer" mode="out-in">
    <div
      v-if="countriesStore.showDrawer"
      class="drawer-overlay"
      @click.self="closeDrawer"
    >
      <div class="drawer">
        <div class="drawer-header">
          <radio-logo />

          <svg width="14" viewBox="0 0 11 11" @click="closeDrawer">
            <path
              d="M9.75584 9.94529L5.75587 5.94532M5.75587 5.94532L1.75586 1.94531M5.75587 5.94532L9.75588 1.94531M5.75587 5.94532L1.75586 9.94534"
              stroke="var(--color-text-light)"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../store/countries";

const countriesStore = useCountriesStore();

const closeDrawer = () => {
  countriesStore.toggleDrawer(false);
};
</script>
