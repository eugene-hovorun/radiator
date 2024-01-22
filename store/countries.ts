import { defineStore } from "pinia";

type State = {
  countries: Country[];
  places: Place[];
  channels: Channel[];
  failedSlugs: string[];
  activeChannel: Channel | null;
  loadingChannelSlug: string | null;
  playingChannelSlug: string | null;
  fetchingChannels: boolean;
  fetchingPlaces: boolean;
  playing: boolean;
};

export const useCountriesStore = defineStore("countriesStore", {
  state: (): State => ({
    countries: [],
    places: [],
    channels: [],
    failedSlugs: [],
    activeChannel: null,
    loadingChannelSlug: null,
    playingChannelSlug: null,
    fetchingChannels: false,
    fetchingPlaces: false,
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
    async fetchChannelsByPlaceId(id: number) {
      this.fetchingChannels = true;
      const channels = await $fetch<Channel[]>("/place/" + id);

      this.channels = channels;
      this.fetchingChannels = false;
    },
    async fetchChannelSrc(channel: Channel) {
      this.loadingChannelSlug = channel.slug;

      const url = channel?.url || "";
      const id = url.split("/").pop();
      const src = await $fetch<string>("/listen/" + id);

      this.activeChannel = {
        ...channel,
        src,
      };
    },
    togglePlay(state?: boolean) {
      this.playing = state ?? !this.playing;
    },
    setFailedChannel(channel: Channel) {
      this.failedSlugs.push(channel.slug);

      this.loadingChannelSlug = null;
      this.activeChannel = null;
      this.playingChannelSlug = null;
    },
  },
});
