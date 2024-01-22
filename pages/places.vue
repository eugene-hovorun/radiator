<template>
  <radio-slider
    title="City"
    border
    :loading="loading"
    :items="countriesStore.places"
    v-model="place"
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
import { useCountriesStore } from "../store/countries";
import { computed, watch } from "vue";

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
      router.push(`/${route.params.country}/${place.slug}`);
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
        router.push(
          `/${route.params.country}/${countriesStore.places[0].slug}`
        );
      }
    }
  },
  { immediate: true }
);

const handleItemClick = (item: unknown) => {
  place.value = item as Place;
};
</script>
