<template>
  <transition name="drawer" mode="out-in">
    <div v-if="countriesStore.showSearch" class="search__overlay" @keydown.stop>
      <div class="search">
        <div class="search__header">
          <lazy-app-logo />

          <base-icon-button name="close" @click="() => closeSearch()" />
        </div>

        <div class="search__dropdown">
          <u-input
            v-model="query"
            autofocus
            autocomplete="off"
            placeholder="country, city or channel"
            @input="debouncedSearch"
          />
          <transition name="play" mode="out-in">
            <base-icon-button
              v-if="countriesStore.fetchingSearch"
              class="search__loading"
              name="loading"
              :size="24"
            />
          </transition>
        </div>

        <div class="search__results">
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
    </div>
  </transition>
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

  countriesStore.toggleSearch(false);
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
</script>

<style lang="scss">
.search {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
  margin: 16px auto 0;
  background: var(--color-border);
  max-width: 384px;
  max-height: calc(100svh - 64px);
  border-radius: 8px;
  box-shadow: 0 0 9px var(--color-shadow);
  transition: background 0.25s;

  &__overlay {
    position: fixed;
    z-index: 4;
    padding: 16px;
    inset: 0;
    backdrop-filter: blur(8px);
    background: color-mix(in srgb, var(--color-bg) 30%, transparent);
    transition: background 0.25s;
  }

  &__header {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
  }

  &__dropdown {
    position: relative;
  }

  &__loading {
    position: absolute;
    width: 24px;
    right: 4px;
    top: 4px;
    background: transparent !important;
  }

  &__results {
    overflow: auto;
  }

  input:focus {
    box-shadow: 0 0 0 1px var(--color-main);
  }

  [aria-haspopup="menu"] {
    display: flex;
    width: 100%;
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
