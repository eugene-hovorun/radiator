<template>
  <radio-slider
    title="Channel"
    :items="countriesStore.channels"
    :loading="fetchingChannels"
    v-model="channel"
  >
    <template #default="{ item }">
      <div
        class="slide slide--channel"
        :class="{
          'slide--active': item.slug === channel?.slug,
          'slide--failed': failedSlugs.includes(item.slug),
        }"
        @click="handleSelect(item)"
      >
        <radio-channel-button
          :playing="item.slug === playingChannelSlug && countriesStore.playing"
          :loading="item.slug === loadingChannelSlug"
          :failed="failedSlugs.includes(item.slug)"
        />
        <div class="slide-title">
          {{ failedSlugs.includes(item.slug) ? "Unavailable" : item.title }}
        </div>
      </div>
    </template>
  </radio-slider>

  <router-view />
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
    const _channel = channel as Channel;

    if (loadingChannelSlug.value === _channel.slug) {
      return;
    }

    router.push(
      `/${route.params.country}/${route.params.place}/${_channel.slug}`
    );

    if (_channel.slug === playingChannelSlug.value) {
      countriesStore.togglePlay();
    } else {
      countriesStore.playingChannelSlug = null;
      countriesStore.fetchChannelSrc(_channel);
    }
  },
});

watch(
  [() => route.params.place, () => countriesStore.places],
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

const handleSelect = (item: unknown) => {
  channel.value = item as Channel;
};
</script>
