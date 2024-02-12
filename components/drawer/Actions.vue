<template>
  <div class="actions">
    <div class="actions__container">
      <div class="actions__list">
        <base-icon-button name="ion:search" size="1.2" @click="search" />

        <base-icon-button
          v-if="activeChannel"
          :name="cahShare ? 'ci:share' : justCopied ? 'ci:check' : 'ci:copy'"
          size="1.2"
          dynamic
          @click="share"
        />

        <base-icon-button name="ci:shuffle" size="1.2" @click="shuffle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../../store/countries";

const countriesStore = useCountriesStore();
const activeChannel = computed(() => countriesStore.activeChannel);
const justCopied = ref(false);
const cahShare = "share" in navigator;

const shuffle = () => countriesStore.shuffle();

const share = () => {
  if (!activeChannel.value) {
    return;
  }

  const title = activeChannel.value.title;
  const url = window.location.href;
  const text = `Listen to ${title} on Radiator`;

  if ("share" in navigator) {
    navigator.share({ title, text, url });
  } else {
    const input = document.createElement("input");
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    justCopied.value = true;

    setTimeout(() => {
      justCopied.value = false;
    }, 500);
  }

  setTimeout(closeDrawer, 500);
};

const search = () => {
  closeDrawer();
  countriesStore.toggleSearch(true);
};

const closeDrawer = () => {
  countriesStore.toggleDrawer(false);
};
</script>

<style lang="scss" scoped>
.actions {
  position: fixed;
  bottom: 80px;
  right: 0;
  width: 100vw;
  pointer-events: none;

  button {
    background: var(--color-border);
  }

  &__container {
    max-width: 1400px;
    margin: auto;
    display: flex;
    justify-content: flex-end;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    pointer-events: auto;
  }
}
</style>
