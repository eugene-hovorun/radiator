<template>
  <radio-layout>
    <radio-alphabet @select="goToLetter" />

    <radio-slider
      title="Country"
      :items="countriesStore.countries"
      v-model="country"
    >
      <template #default="{ item }">
        <div
          class="slide"
          :class="{ 'slide--active': item.slug === country?.slug }"
          @click="handleItemClick(item)"
        >
          {{ item.title }}
        </div>
      </template>
    </radio-slider>

    <router-view />
  </radio-layout>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../store/countries";
import { pickRandomItem } from "../store/utils";

const route = useRoute();
const router = useRouter();
const countriesStore = useCountriesStore();

await callOnce(countriesStore.fetchCountries);

const country = computed<Country>({
  get(): Country {
    const countries = countriesStore.countries;
    const param = route.params.country;
    const country = countries.find((c) => c.slug === param);

    return country || countries[0];
  },
  set(country?: Country) {
    if (country) {
      router.push(`/${country.slug}`);
    }
  },
});

const handleItemClick = (item: unknown) => {
  country.value = item as Country;
};

const goToLetter = (letter: string) => {
  const country = countriesStore.countries.find((c) =>
    c.title.toLowerCase().startsWith(letter)
  );

  if (country) {
    router.push(`/${country.slug}`);
  }
};

onMounted(() => {
  if (!route.params.country) {
    router.push(`/${pickRandomItem(countriesStore.countries).slug}`);
  }
});
</script>
