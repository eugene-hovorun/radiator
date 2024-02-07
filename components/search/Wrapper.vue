<template>
  <transition name="drawer" mode="out-in">
    <div
      v-if="countriesStore.showSearch"
      class="search fixed z-[4] p-4 inset-0 bg-bg/30 backdrop-blur transition-colors"
    >
      <div
        class="bg-border max-w-sm max-h-[calc(100vh-64px)] flex flex-col gap-6 mx-auto mt-4 p-3 rounded-lg transition-colors shadow-[0_0_9px_var(--color-shadow)]"
      >
        <div class="flex gap-3 justify-between items-center">
          <lazy-app-logo />

          <base-icon-button name="ion:close" @click="closeSearch" />
        </div>

        <div class="relative">
          <u-input
            v-model="query"
            class="w-full"
            autofocus
            autocomplete="off"
            placeholder="country, city or channel"
            @input="debouncedSearch"
          />
          <transition name="play" mode="out-in">
            <svg
              v-if="countriesStore.fetchingSearch"
              viewBox="0 0 42 42"
              class="w-6 absolute right-1 top-1"
            >
              <circle
                cx="21"
                cy="21"
                r="19"
                fill="none"
                stroke="var(--color-main)"
                stroke-width="4"
                stroke-dasharray="10 5"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="4s"
                  values="0 21 21;360 21 21"
                ></animateTransform>
              </circle>
            </svg>
          </transition>
        </div>

        <div class="overflow-auto">
          <div v-if="searchResults.countries.length">
            <search-result-section
              title="Countries"
              :items="searchResults.countries"
              @select="handleSelect"
            />
          </div>
          <div v-if="searchResults.places.length">
            <search-result-section
              title="Places"
              :items="searchResults.places"
              @select="handleSelect"
            />
          </div>
          <div v-if="searchResults.channels.length">
            <search-result-section
              title="Channels"
              :items="searchResults.channels"
              @select="handleSelect"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useDebounceFn } from "@vueuse/core";
import { useCountriesStore } from "../../store/countries";
import { highlightMatchedText } from "../../store/utils";

type SearchItem = Country | Place | Channel;

const router = useRouter();
const countriesStore = useCountriesStore();
const query = ref("");
const searchResults = computed(() => ({
  countries: countriesStore.searchResults.countries.map((item) => ({
    ...item,
    label: highlightMatchedText(item.title, query.value),
  })),
  channels: countriesStore.searchResults.channels.map((item) => ({
    ...item,
    label: highlightMatchedText(
      `<span class="search-country">${item.subtitle}</span> > ${item.title}`,
      query.value,
    ),
  })),
  places: countriesStore.searchResults.places.map((item) => ({
    ...item,
    label: highlightMatchedText(
      `<span class="search-country">${item.country}</span> > ${item.title}`,
      query.value,
    ),
  })),
}));

const closeSearch = () => {
  countriesStore.clearSearchResults();
  query.value = "";

  countriesStore.toggleSearch(false);
};

const debouncedSearch = useDebounceFn(() => handleQueryChange(), 500);

const handleQueryChange = () => {
  countriesStore.getSearchResults(query.value);
};

const isPlace = (result: SearchItem): result is Place => "geo" in result;
const isChannel = (result: SearchItem): result is Channel => "stream" in result;

const handleSelect = (item: SearchItem) => {
  if (isPlace(item)) {
    router.push(`/${item.countryId}/${item.slug}`);
  } else if (isChannel(item)) {
    router.push(item.url);
  } else {
    router.push(`/${item.id}`);
  }

  closeSearch();
};
</script>

<style>
.search input:focus {
  box-shadow: 0 0 0 1px var(--color-main);
}

.search [aria-haspopup="menu"] {
  display: flex;
  width: 100%;
}

.search .search-result {
  font-weight: bold;
  color: var(--color-main);
}

.search .search-country {
  opacity: 0.5;
}

.result-section + .result-section {
  border-top: 1px solid var(--color-bg);
}
</style>
