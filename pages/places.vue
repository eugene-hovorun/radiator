<template>
  <radio-slider
    v-model="place"
    title="City"
    alphabet
    :loading="loading"
    :items="countriesStore.places"
    @go-to-letter="goToCityByLetter"
  >
    <template #default="{ item }">
      <div
        class="slide"
        :class="{ 'slide--active': item.slug === place?.slug }"
        @click="handleItemClick(item)"
      >
        <div class="slide-title">
          {{ item.title }}
        </div>
      </div>
    </template>
  </radio-slider>

  <router-view />
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { useCountriesStore } from "../store/countries";

const route = useRoute();
const router = useRouter();
const countriesStore = useCountriesStore();
const loading = computed(() => countriesStore.fetchingPlaces);

const place = computed<Place>({
  get(): Place {
    const places = countriesStore.places;
    const param = route.params.place;

    return places.find((p) => p.slug === param) || places[0];
  },
  set(place?: Place) {
    if (place) {
      router.replace(`/${route.params.country}/${place.slug}`);
    }
  },
});

watch(
  () => route.params.country,
  async (country) => {
    const countrySlug = Array.isArray(country) ? country[0] : country;

    if (countrySlug) {
      await countriesStore.fetchPlacesByCountrySlug(countrySlug);

      if (!route.params.place && countriesStore.places[0]) {
        router.replace(
          `/${route.params.country}/${countriesStore.places[0].slug}`,
        );
      }
    }
  },
  { immediate: true },
);

const handleItemClick = (item: unknown) => {
  place.value = item as Place;
};

const goToCityByLetter = (letter: string) => {
  const place = countriesStore.places.find((p) =>
    p.title.toLowerCase().startsWith(letter),
  );

  if (place) {
    const country = route.params.country;

    router.replace(`/${country}/${place.slug}`);
  }
};
</script>
