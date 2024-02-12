<template>
  <radio-slider
    v-model="channel"
    title="Channel"
    :items="countriesStore.channels"
    :loading="fetchingChannels"
    @go-to-letter="goToChannelByLetter"
  >
    <template #default="{ item }">
      <div
        class="slide"
        :class="{
          active: item.id === channel?.id,
          failed: isFailed(item),
        }"
        @click="handleSelect(item)"
      >
        <play-button
          :playing="item.id === playingChannelId && countriesStore.playing"
          :loading="item.id === loadingChannelId"
          :failed="isFailed(item)"
        />
        <div class="slide-title">
          {{
            isFailed(item)
              ? "Unavailable. Loading random channel..."
              : item.title
          }}
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
          handleSelect(channel);
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

const goToChannelByLetter = (letter: string) => {
  const { country, place } = route.params;
  const channel = countriesStore.channels.find((c) =>
    c.title.toLowerCase().startsWith(letter),
  );

  if (channel) {
    router.replace(`/${country}/${place}/${channel.id}`);
  }
};
</script>

<style lang="scss" scoped>
.slide {
  padding-left: 0;
  padding-right: 16px;
  gap: 8px;
  justify-content: space-between;
  border: 2px solid var(--color-main);
  color: var(--color-text-light);
  transition:
    background 0.25s,
    color 0.25s;
  backdrop-filter: blur(8px);

  &.active {
    font-weight: bold;
    background: var(--color-main);
    color: var(--color-text-dark);
  }

  &.failed {
    opacity: 0.3;
  }
}
</style>
