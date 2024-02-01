<template>
  <radio-slider
    v-model="channel"
    title="Channel"
    :items="countriesStore.channels"
    :loading="fetchingChannels"
  >
    <template #default="{ item }">
      <div
        class="slide gap-2 border-2 pr-4 pl-0 border-main backdrop-blur"
        :class="{
          'text-text-dark bg-main font-bold': item.id === channel?.id,
          'text-text-light': item.id !== channel?.id,
          'opacity-30': isFailed(item),
        }"
        @click="handleSelect(item)"
      >
        <radio-channel-button
          class="mr-auto"
          :playing="item.id === playingChannelId && countriesStore.playing"
          :loading="item.id === loadingChannelId"
          :failed="isFailed(item)"
        />
        <div class="slide-title">
          {{ isFailed(item) ? "Unavailable" : item.title }}
        </div>
      </div>
    </template>
  </radio-slider>

  <router-view />
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../store/countries";
import { pickRandomItem } from "../store/utils";

const router = useRouter();
const route = useRoute();
const countriesStore = useCountriesStore();
const loadingChannelId = computed(() => countriesStore.loadingChannelId);
const playingChannelId = computed(() => countriesStore.playingChannelId);
const fetchingChannels = computed(() => countriesStore.fetchingChannels);
const failedIds = computed(() => countriesStore.failedIds);

const channel = computed<Channel>({
  get(): Channel {
    const channels = countriesStore.channels;
    const param = route.params.channel;

    return channels.find((c) => c.id === param) || pickRandomItem(channels);
  },
  set(channel?: Channel) {
    const loadingId = loadingChannelId.value;
    const _channel = channel as Channel;

    if (loadingId) {
      countriesStore.cancelFetchChannelSrc();
    }

    if (loadingId === _channel.id) {
      return;
    }

    if (_channel.id === playingChannelId.value) {
      countriesStore.togglePlay();
    } else {
      const { country, place } = route.params;

      router.replace(`/${country}/${place}/${_channel.id}`);
      countriesStore.fetchChannelSrc(_channel);

      countriesStore.playingChannelId = null;
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
      const randomChannel = pickRandomItem(countriesStore.channels);

      if (countriesStore.autoplay) {
        const channel =
          countriesStore.channels.find((c) => c.id === route.params.channel) ||
          randomChannel;

        if (channel) {
          countriesStore.fetchChannelSrc(channel);
          countriesStore.playingChannelId = null;
          countriesStore.autoplay = false;
        }
      } else if (!route.params.channel && randomChannel) {
        router.replace(
          `/${route.params.country}/${route.params.place}/${randomChannel.id}`,
        );
      }
    }
  },
  { immediate: true },
);

const handleSelect = (item: unknown) => {
  channel.value = item as Channel;
};

const isFailed = (item: unknown) => {
  const channel = item as Channel;

  return failedIds.value.includes(channel.id);
};
</script>
