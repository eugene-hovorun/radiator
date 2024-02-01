<template>
  <div
    class="flex flex-col gap-8 max-w-md m-auto h-screen justify-center text-center text-text-light"
  >
    <div class="text-2xl">Country or place not found</div>
    <button class="bg-text-dark rounded p-3" @click="goHome">Go Home</button>
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
