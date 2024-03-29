<template>
  <radio-app>
    <nav-slider
      v-model="country"
      title="Country"
      :items="countriesStore.countries"
      @go-to-letter="goToCountryByLetter"
    >
      <template #default="{ item }">
        <nav-slide
          :item="item"
          :active="item.slug === country?.slug"
          @select="handleItemClick(item)"
        />
      </template>
    </nav-slider>

    <router-view />
  </radio-app>
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
    try {
      const countries = countriesStore.countries;
      const param = route.params.country;
      const country = countries.find((c) => c.id === param);

      if (param && !country) {
        throw new Error("Country not found");
      } else {
        return country || countries[0];
      }
    } catch (error) {
      router.replace("/404");
      return countriesStore.countries[0];
    }
  },
  set(country: Country) {
    router.replace(`/${country.id}`);
  },
});

const handleItemClick = (item: unknown) => {
  country.value = item as Country;
};

const goToCountryByLetter = (letter: string) => {
  const country = countriesStore.countries.find((c) =>
    c.title.toLowerCase().startsWith(letter),
  );

  if (country) {
    router.replace(`/${country.id}`);
  }
};

onMounted(() => {
  if (!route.params.country) {
    router.replace(`/${pickRandomItem(countriesStore.countries).id}`);
  }
});
</script>
