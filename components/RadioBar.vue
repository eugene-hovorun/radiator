<template>
  <div class="bar">
    <div class="bar-container">
      <template v-if="activeChannel">
        <radio-channel-button
          :playing="countriesStore.playing"
          :loading="!!loadingChannelId"
          @click="togglePlay"
        />
        <div>
          <div v-if="countryTitle" class="bar-country">
            <img :src="flagSrc" class="bar-flag" alt="" />
            <span>{{ countryTitle }}</span>
          </div>
          <div class="bar-channel">
            <span v-if="activeChannel"> {{ activeChannel.title }}</span>
          </div>
        </div>
      </template>

      <div class="bar-actions">
        <radio-channel-button @click="() => countriesStore.toggleDrawer(true)">
          <svg viewBox="0 0 17 13" fill="none" style="width: 70%">
            <path
              d="M1.38281 11.1348H15.3828M1.38281 6.13477H15.3828M1.38281 1.13477H15.3828"
              stroke="var(--color-text-light)"
              stroke-width="2"
            />
          </svg>
        </radio-channel-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../store/countries";

const route = useRoute();
const countriesStore = useCountriesStore();
const loadingChannelId = computed(() => countriesStore.loadingChannelId);
const activeChannel = computed(() => countriesStore.activeChannel);

const flagSrc = ref("");
const countryTitle = ref("");

watch(
  () => activeChannel.value,
  () => {
    const param = route.params.country;
    const country = countriesStore.countries.find((c) => c.id === param);

    flagSrc.value = `/flag/${country?.id}.svg`;
    countryTitle.value = country?.title || "";
  },
  { immediate: true },
);

const togglePlay = () => {
  if (loadingChannelId.value) {
    return;
  }

  countriesStore.togglePlay();
};
</script>
