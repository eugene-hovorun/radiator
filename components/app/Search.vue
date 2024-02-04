<template>
  <transition name="drawer" mode="out-in">
    <div
      v-if="countriesStore.showSearch"
      class="search fixed z-[4] inset-0 bg-bg/30 backdrop-blur"
    >
      <div class="bg-border max-w-sm mx-auto mt-8 p-3 rounded-lg">
        <div class="flex gap-3 justify-between">
          <lazy-app-logo />

          <base-icon-button name="ion:close" @click="closeSearch" />
        </div>

        <div class="relative">
          <u-input
            v-model="query"
            class="w-full my-4"
            autofocus
            placeholder="search country or city"
            @input="debouncedSearch"
          />

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
        </div>

        <div v-if="searchResults.length" class="max-h-40 overflow-auto">
          <div
            v-for="result in searchResults"
            :key="result.id"
            class="border-t p-2 border-t-[var(--color-bg)] cursor-pointer transition-colors text-text-light hover:text-main"
            @click="handleSelect(result)"
            v-html="result.label"
          ></div>
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
const searchResults = computed(() =>
  countriesStore.searchResults.map((item: Country | Place) => {
    const label = isPlace(item)
      ? `<span class="search-country">${item.country}</span> > ${item.title}`
      : item.title;

    return {
      ...item,
      label: highlightMatchedText(label, query.value),
    };
  }),
);

const closeSearch = () => {
  countriesStore.searchResults = [];
  query.value = "";

  countriesStore.toggleSearch(false);
};

const debouncedSearch = useDebounceFn(() => handleQueryChange(), 500);

const handleQueryChange = () => {
  countriesStore.getSearchResults(query.value);
};

const isPlace = (result: Country | Place): result is Place => {
  return "geo" in result;
};

const handleSelect = (item: Country | Place) => {
  if (isPlace(item)) {
    router.push(`/${item.countryId}/${item.slug}`);
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
</style>
