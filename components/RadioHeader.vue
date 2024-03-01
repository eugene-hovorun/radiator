<template>
  <div class="header">
    <div class="header__logo">
      <app-logo :width="220" />
    </div>

    <div>
      <search-wrapper>
        <template #append>
          <base-icon-button
            name="menu-alt-right"
            class="header__drawer-button"
            :transparent="true"
            :size="36"
            @click="() => countriesStore.toggleDrawer()"
          />
        </template>
      </search-wrapper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../store/countries";

const countriesStore = useCountriesStore();
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 0 12px 16px;
  padding-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  &__logo {
    display: flex;
    justify-content: center;
  }

  &__drawer-button {
    min-height: 45px;
    min-width: 45px;
    border-radius: 16px;
    background: var(--color-border);
  }
}
</style>
