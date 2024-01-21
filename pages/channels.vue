<template>
  <radio-slider
    title="Channel"
    :items="countriesStore.channels"
    :loading="fetchingChannels"
    v-model="channel"
  >
    <template #default="{ item }">
      <div class="slide slide--channel" @click="handleItemClick(item)">
        <radio-channel-button
          :playing="item.slug === playingChannelSlug && countriesStore.playing"
          :loading="item.slug === loadingChannelSlug"
          :failed="failedSlugs.includes(item.slug)"
        />
        {{ failedSlugs.includes(item.slug) ? 'unavailable' : item.title }}
      </div>
    </template>
  </radio-slider>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../store/countries";

const router = useRouter();
const route = useRoute();
const countriesStore = useCountriesStore();
const loadingChannelSlug = computed(() => countriesStore.loadingChannelSlug);
const playingChannelSlug = computed(() => countriesStore.playingChannelSlug);
const fetchingChannels = computed(() => countriesStore.fetchingChannels);
const failedSlugs = computed(() => countriesStore.failedSlugs);

const channel = computed<Channel>({
  get(): Channel {
    const channels = countriesStore.channels;
    const param = route.params.channel;

    return channels.find((c) => c.slug === param) || channels[0];
  },
  set(channel?: Channel) {
    if (channel) {
      router.push(
        `/${route.params.country}/${route.params.place}/${channel.slug}`
      );
    }
  },
});

watch(
  () => route.params.place,
  async (place) => {
    const placeSlug = Array.isArray(place) ? place[0] : place;
    const placeId = countriesStore.places.find((p) => p.slug === placeSlug)?.id;

    if (placeId) {
      await countriesStore.fetchChannelsByPlaceId(placeId);

      if (!route.params.channel && countriesStore.channels[0]) {
        router.push(
          `/${route.params.country}/${route.params.place}/${countriesStore.channels[0].slug}`
        );
      }
    }
  },
  { immediate: true }
);

const handleItemClick = (item: unknown) => {

  if (loadingChannelSlug.value) {
    return;
  }

  const _channel = item as Channel;

  if (_channel.slug === playingChannelSlug.value) {
    countriesStore.togglePlay();
  } else {
    countriesStore.playingChannelSlug = null;
    countriesStore.fetchChannelSrc(_channel);
  }
};
</script>
