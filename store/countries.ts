import { defineStore } from "pinia";
import { themes } from "~/assets/themes";

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
  showDrawer: boolean;
  currentThemeValue: Theme["value"];
  abortController: AbortController | null;
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
    showDrawer: false,
    currentThemeValue: themes[0].value,
    abortController: null,
  }),
  actions: {
    async fetchCountries() {
      const countries = await $fetch<Country[]>("/countries");

      this.countries = countries;
    },

    async fetchPlacesByCountryId(id: string) {
      this.fetchingPlaces = true;

      const places = await $fetch<Place[]>("/places/" + id);

      this.places = places;
      this.fetchingPlaces = false;
    },

    async fetchChannelsByPlaceId(id: string) {
      this.fetchingChannels = true;
      const channels = await $fetch<Channel[]>("/place/" + id);

      this.channels = channels;
      this.fetchingChannels = false;
    },

    fetchChannelSrc(channel: Channel) {
      this.loadingChannelId = channel.id;
      this.abortController = new AbortController();

      $fetch<string>("/listen/" + channel.id, {
        signal: this.abortController.signal,
      })
        .then((src) => (this.activeChannel = { ...channel, src }))
        .catch(() => {});
    },

    cancelFetchChannelSrc() {
      this.abortController?.abort();

      this.abortController = null;
      this.loadingChannelId = null;
      this.activeChannel = null;
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

    toggleDrawer(show?: boolean) {
      this.showDrawer = show ?? !this.showDrawer;
    },

    initTheme() {
      const storedValue = localStorage.getItem("radio-theme") as Theme["value"];
      const storedTheme = storedValue || themes[0].value;

      if (!storedValue) {
        localStorage.setItem("radio-theme", storedTheme);
      }

      this.currentThemeValue = storedTheme;
      document.documentElement.setAttribute("data-theme", storedTheme);
    },

    setTheme(theme: Theme["value"]) {
      localStorage.setItem("radio-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      this.currentThemeValue = theme;
    },
  },
});
