import { defineStore } from "pinia";

type State = {
  countries: Country[];
  places: Place[];
  channels: Channel[];
  failedIds: string[];
  activeChannel: Channel | null;
  loadingChannelId: string | null;
  playingChannelId: string | null;
  fetchingChannels: boolean;
  fetchingPlaces: boolean;
  playing: boolean;
};

export const useCountriesStore = defineStore("countriesStore", {
  state: (): State => ({
    countries: [],
    places: [],
    channels: [],
    failedIds: [],
    activeChannel: null,
    loadingChannelId: null,
    playingChannelId: null,
    fetchingChannels: false,
    fetchingPlaces: true,
    playing: false,
  }),
  actions: {
    async fetchCountries() {
      const countries = await $fetch<Country[]>("/countries");

      this.countries = countries;
    },
    async fetchPlacesByCountrySlug(slug: string) {
      this.fetchingPlaces = true;

      const places = await $fetch<Place[]>("/places/" + slug);

      this.places = places;
      this.fetchingPlaces = false;
    },
    async fetchChannelsByPlaceId(id: string) {
      this.fetchingChannels = true;
      const channels = await $fetch<Channel[]>("/place/" + id);

      this.channels = channels;
      this.fetchingChannels = false;
    },
    async fetchChannelSrc(channel: Channel) {
      this.loadingChannelId = channel.id;

      const src = await $fetch<string>("/listen/" + channel.id);

      this.activeChannel = {
        ...channel,
        src,
      };
    },
    togglePlay(state?: boolean) {
      this.playing = state ?? !this.playing;
    },
    setFailedChannel(channel: Channel) {
      this.failedIds.push(channel.id);

      this.loadingChannelId = null;
      this.activeChannel = null;
      this.playingChannelId = null;
    },
  },
});
