<template>
  <radio-slider
    v-model="place"
    title="City"
    :loading="loading"
    :items="countriesStore.places"
    @go-to-letter="goToCityByLetter"
  >
    <template #default="{ item }">
      <div
        class="slide"
        :class="{ active: item.slug === place?.slug }"
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
import { pickRandomItem } from "../store/utils";

const route = useRoute();
const router = useRouter();
const countriesStore = useCountriesStore();
const loading = computed(() => countriesStore.fetchingPlaces);

const place = computed<Place>({
  get(): Place {
    const places = countriesStore.places;
    const param = route.params.place;

    return places.find((p) => p.slug === param) || pickRandomItem(places);
  },
  set(place: Place) {
    router.replace(`/${route.params.country}/${place.slug}`);
  },
});

watch(
  () => route.params.country,
  async (country) => {
    const countryId = Array.isArray(country) ? country[0] : country;

    if (countryId) {
      await countriesStore.fetchPlacesByCountryId(countryId);
      const randomPlace = pickRandomItem(countriesStore.places);

      if (!route.params.place && randomPlace) {
        router.replace(`/${route.params.country}/${randomPlace.slug}`);
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

<style scoped lang="scss">
.slide {
  padding-left: 16px;
  padding-right: 16px;
  color: var(--color-text-light);
  transition:
    background 0.25s,
    color 0.25s;
  backdrop-filter: blur(8px);

  &.active {
    background: var(--color-main);
    color: var(--color-text-dark);
    font-weight: bold;
  }
}
</style>
