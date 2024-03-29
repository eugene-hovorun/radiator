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
          label="Volume"
          class="bar__volume"
        />

        <base-icon-button name="shuffle" :size="36" @click="shuffle" />

        <base-icon-button
          :name="cahShare ? 'share' : justCopied ? 'check' : 'copy'"
          :size="36"
          :disabled="!activeChannel"
          @click="share"
        />

        <base-icon-button
          :name="isFavorite ? 'heart' : 'heart-outline'"
          label="Favorite"
          :disabled="!activeChannel"
          :size="36"
          @click="toggleFavorite"
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
const justCopied = ref(false);
const cahShare = "share" in navigator;

const shuffle = () => countriesStore.shuffle();

const share = () => {
  if (!activeChannel.value) {
    return;
  }

  const title = activeChannel.value.title;
  const url = window.location.href;
  const text = `Listen to ${title} on Radiator`;

  if ("share" in navigator) {
    navigator.share({ title, text, url });
  } else {
    const input = document.createElement("input");
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    justCopied.value = true;

    setTimeout(() => {
      justCopied.value = false;
    }, 500);
  }
};

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
  z-index: 1;

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 12px;
    height: 80px;
    display: flex;
    align-items: center;
    gap: 16px;
    user-select: none;
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
    color: var(--color-light);

    @media (max-width: 600px) {
      max-width: 130px;
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
