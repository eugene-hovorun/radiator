<template>
  <div class="bar">
    <div class="bar__container">
      <template v-if="activeChannel">
        <play-button
          :playing="countriesStore.playing"
          :loading="!!loadingChannelId"
          :size="48"
          @click="togglePlay"
        />
        <div>
          <div v-if="countryTitle" class="bar__country">
            <img :src="flagSrc" alt="" />
            <span>{{ countryTitle }}</span>
          </div>

          <div v-if="activeChannel" class="bar__channel">
            {{ activeChannel.title }}
          </div>
        </div>
      </template>

      <div class="bar__actions">
        <base-range
          v-model="volume"
          :min="0"
          :max="1"
          :step="0.01"
          class="bar__volume"
        />

        <base-icon-button
          :name="isFavorite ? 'heart' : 'heart-outline'"
          :disabled="!activeChannel"
          :size="36"
          @click="toggleFavorite"
        />

        <base-icon-button
          name="menu-alt-right"
          :size="36"
          @click="() => countriesStore.toggleDrawer(true)"
        />
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
const favoriteChannels = computed(() => countriesStore.favoriteChannels);
const isFavorite = computed(() => {
  const channelId = activeChannel.value?.id;
  return channelId && favoriteChannels.value.some((c) => c.id === channelId);
});

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

const volume = computed({
  get: () => countriesStore.volume,
  set: (value) => countriesStore.setVolume(value),
});

const togglePlay = () => {
  if (loadingChannelId.value) {
    return;
  }

  countriesStore.togglePlay();
};

const toggleFavorite = () => {
  if (!activeChannel.value) {
    return;
  }

  const country = route.params.country;
  const countryId = Array.isArray(country) ? country[0] : country;
  const { id, title } = activeChannel.value;

  countriesStore.toggleFavorite({
    id,
    url: route.fullPath,
    title,
    countryId,
  });
};
</script>

<style scoped lang="scss">
.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-border);
  box-shadow: 0 -10px 9px var(--color-shadow);
  transition: background 0.25s;

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 12px;
    height: 80px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__country {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 12px;
    color: var(--color-main);

    img {
      width: 24px;
    }
  }

  &__channel {
    max-width: 300px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: var(--color-text-light);

    @media (max-width: 600px) {
      max-width: 180px;
    }
  }

  &__actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__volume {
    width: 128px;

    @media (max-width: 600px) {
      display: none;
    }
  }
}

@media (max-width: 600px) {
  .bar-channel {
    max-width: 130px;
  }
}
</style>
