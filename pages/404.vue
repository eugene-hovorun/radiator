<template>
  <div
    style="
      min-height: 50vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--color-text-light);
    "
  >
    <h1>Country or Place not found</h1>
    <button @click="goHome">Go home</button>
  </div>
</template>

<script lang="ts" setup>
import { pickRandomItem } from "../store/utils";
import { useCountriesStore } from "../store/countries";

const router = useRouter();
const countriesStore = useCountriesStore();
const goHome = () => {
  router.replace(`/${pickRandomItem(countriesStore.countries).id}`);
};

await callOnce(countriesStore.fetchCountries);
</script>
