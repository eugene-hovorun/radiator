<template>
  <div class="search" @keydown="filterKeys">
    <div class="search__field">
      <base-textfield
        v-model="query"
        :loading="countriesStore.fetchingSearch"
        :autofocus="true"
        placeholder="Search"
        @input="debouncedSearch"
      />

      <slot name="append" />
    </div>

    <div class="search__results scrollbar">
      <search-result-section
        v-if="searchResults.countries.length"
        title="Countries"
        :items="searchResults.countries"
        @select="selectCountry"
      />

      <search-result-section
        v-if="searchResults.places.length"
        title="Places"
        :items="searchResults.places"
        @select="selectPlace"
      />

      <search-result-section
        v-if="searchResults.channels.length"
        title="Channels"
        :items="searchResults.channels"
        @select="selectChannel"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from "@vueuse/core";
import { useCountriesStore } from "../../store/countries";
import { highlightMatchedText } from "../../store/utils";

const router = useRouter();
const countriesStore = useCountriesStore();
const query = ref("");
const trimmedQuery = computed(() => query.value.trim());
const searchResults = computed(() => ({
  countries: countriesStore.searchResults.countries.map((item) => ({
    ...item,
    label: highlightMatchedText(item.title, trimmedQuery.value),
  })),
  channels: countriesStore.searchResults.channels.map((item) => ({
    ...item,
    label: highlightMatchedText(
      `<span class="search-country">${item.subtitle}</span> > ${item.title}`,
      trimmedQuery.value,
    ),
  })),
  places: countriesStore.searchResults.places.map((item) => ({
    ...item,
    label: highlightMatchedText(
      `<span class="search-country">${item.country}</span> > ${item.title}`,
      trimmedQuery.value,
    ),
  })),
}));

const closeSearch = (autoplay?: boolean) => {
  countriesStore.clearSearchResults();
  query.value = "";

  countriesStore.autoplay = !!autoplay;
};

const debouncedSearch = useDebounceFn(() => handleQueryChange(), 500);

const handleQueryChange = () => {
  countriesStore.getSearchResults(trimmedQuery.value);
};

const selectCountry = (country: Country) => {
  closeSearch();
  router.push(`/${country.id}`);
};

const selectPlace = (place: Place) => {
  closeSearch();
  router.push(`/${place.countryId}/${place.slug}`);
};

const selectChannel = (channel: Channel) => {
  closeSearch(true);
  router.push(channel.url);
};

const filterKeys = (event: KeyboardEvent) => {
  // Preventing numbers and space key
  if (!isNaN(parseInt(event.key)) || event.key === " ") {
    event.stopPropagation();
  }
};
</script>

<style lang="scss">
.search {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 24px;
  max-width: 420px;
  margin: auto;
  transition: background 0.25s;

  &__field {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__results {
    position: absolute;
    top: calc(100% + 16px);
    left: 0;
    right: 0;
    overflow: auto;
    max-height: 400px;
    background-color: var(--color-border);
    box-shadow: 0 -10px 9px var(--color-shadow);
    border-radius: 16px;
    z-index: 2;
  }

  .search-result {
    font-weight: bold;
    color: var(--color-main);
  }

  .search-country {
    opacity: 0.5;
  }
}
</style>
