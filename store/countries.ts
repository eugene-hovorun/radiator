import { defineStore } from "pinia";
import {
  pickRandomItem,
  setMediaSessionData,
  setMediaSessionAction,
} from "./utils";
import { themes } from "~/assets/themes";

type State = {
  countries: Country[];
  places: Place[];
  channels: Channel[];
  failedIds: string[];
  activeChannel: Channel | null;
  loadingChannelId: string | null;
  playingChannelId: string | null;
  favoriteChannels: FavoriteChannel[];
  fetchingChannels: boolean;
  fetchingPlaces: boolean;
  playing: boolean;
  autoplay: boolean;
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
    favoriteChannels: [],
    fetchingChannels: false,
    fetchingPlaces: true,
    playing: false,
    autoplay: false,
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

      if (this.playing) {
        this.setAudioMetaData();
      }
    },

    setFailedChannel(channel: Channel) {
      this.failedIds.push(channel.id);

      this.loadingChannelId = null;
      this.activeChannel = null;
      this.playingChannelId = null;

      setMediaSessionData("failed", { artist: channel.title });
    },

    toggleDrawer(show?: boolean) {
      this.showDrawer = show ?? !this.showDrawer;
    },

    applyStoredData() {
      const storedFavorites = localStorage.getItem("radio-favorites");
      const storedThemeValue = localStorage.getItem(
        "radio-theme",
      ) as Theme["value"];
      const theme = storedThemeValue || themes[0].value;
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (!storedThemeValue) {
        localStorage.setItem("radio-theme", theme);
      }

      if (!storedFavorites) {
        localStorage.setItem("radio-favorites", JSON.stringify(favorites));
      }

      this.favoriteChannels = favorites;
      this.currentThemeValue = theme;

      document.documentElement.setAttribute("data-theme", theme);
    },

    setTheme(theme: Theme["value"]) {
      localStorage.setItem("radio-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      this.currentThemeValue = theme;
    },

    toggleFavorite(channel: FavoriteChannel) {
      const index = this.favoriteChannels.findIndex((c) => c.id === channel.id);

      if (index === -1) {
        this.favoriteChannels.push(channel);
      } else {
        this.favoriteChannels.splice(index, 1);
      }

      localStorage.setItem(
        "radio-favorites",
        JSON.stringify(this.favoriteChannels),
      );
    },

    setAudioMetaData() {
      const app = useNuxtApp();
      const countryParam = app._route.params.country;
      const country = this.countries.find((c) => c.id === countryParam);

      setMediaSessionData("playing", {
        title: country?.title,
        artist: this.activeChannel?.title,
        countryCode: country?.id,
      });

      setMediaSessionAction("nexttrack", () => {
        setMediaSessionData("loading");

        app.$router.replace(`/${pickRandomItem(this.countries).id}`);
        this.autoplay = true;
      });

      setMediaSessionAction("pause", () => this.togglePlay(false));
      setMediaSessionAction("play", () => this.togglePlay(true));
    },
  },
});
