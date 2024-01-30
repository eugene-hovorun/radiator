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
        <base-icon-button
          name="ion:shuffle-outline"
          size="1.2"
          dynamic
          @click="shuffle"
        />

        <base-icon-button
          v-if="activeChannel"
          :name="isFavorite ? 'ion:heart-dislike-outline' : 'ion:heart-outline'"
          size="1.2"
          dynamic
          @click="toggleFavorite"
        />

        <base-icon-button
          name="bx:menu-alt-right"
          size="1.2"
          dynamic
          @click="() => countriesStore.toggleDrawer(true)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../store/countries";
import { pickRandomItem } from "../store/utils";

const router = useRouter();
const route = useRoute();
const countriesStore = useCountriesStore();
const loadingChannelId = computed(() => countriesStore.loadingChannelId);
const activeChannel = computed(() => countriesStore.activeChannel);
const favoriteChannels = computed(() => countriesStore.favoriteChannels);

const flagSrc = ref("");
const countryTitle = ref("");
const isFavorite = computed(() => {
  const channelId = activeChannel.value?.id;
  return channelId && favoriteChannels.value.some((c) => c.id === channelId);
});

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

const shuffle = () => {
  router.replace(`/${pickRandomItem(countriesStore.countries).id}`);
  countriesStore.autoplay = true;
};
</script>

<style scoped>
.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-border);
  box-shadow: 0 -4px 12px 0 color-mix(in srgb, var(--color-primary) 15%, rgba(0, 0, 0, 1));
}

.bar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 12px;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.channel-button {
  width: 48px;
  height: 48px;
  font-size: 2rem;
}

.bar-country {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: var(--color-primary);
}

.bar-flag {
  width: 24px;
  aspect-ratio: 3/4;
}

.bar-channel {
  max-width: 130px;
  height: 17px;
  font-size: 14px;
  color: var(--color-text-light);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.bar-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
