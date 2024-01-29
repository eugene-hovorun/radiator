<template>
  <div class="bar">
    <div v-if="activeChannel" class="bar-container">
      <radio-channel-button
        :playing="countriesStore.playing"
        :loading="!!loadingChannelId"
        @click="() => countriesStore.togglePlay()"
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
</script>
