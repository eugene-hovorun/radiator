<template>
  <div class="not-found">
    <div>Country or place not found</div>
    <button @click="goHome">Go Home</button>
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

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  max-width: 448rem;
  margin: auto;
  height: 100svh;
  text-align: center;

  div {
    font-size: 24px;
  }

  button {
    border-radius: 8px;
    padding: 12px;
  }
}
</style>
