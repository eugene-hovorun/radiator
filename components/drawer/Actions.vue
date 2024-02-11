<template>
  <div class="actions fixed bottom-20 right-0 w-screen pointer-events-none">
    <div class="max-w-[1400px] m-auto flex justify-end">
      <div class="flex flex-col gap-3 p-3 pointer-events-auto">
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

<style scoped>
.actions button {
  background: var(--color-border);
}
</style>
