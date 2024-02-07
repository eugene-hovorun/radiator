import axios from "axios";
import { mapChannels, mapCountries, mapPlaces } from "./map";
import { createSlug } from "./slug";

const SUPER_CACHE: {
  countries: Country[];
  places: Place[];
  channels: { [key: string]: Channel[] };
} = {
  countries: [],
  places: [],
  channels: {},
};

const MAX_SEARCH_RESULTS = 12;

const _axios = axios.create({
  baseURL: "https://radio.garden/api/ara/content",
});

export const api = {
  getCountries: async (): Promise<Country[]> => {
    try {
      if (!SUPER_CACHE.countries.length || !SUPER_CACHE.places.length) {
        await api.getPlaces();
      }

      return SUPER_CACHE.countries;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  getPlaces: async (): Promise<Place[]> => {
    try {
      if (!SUPER_CACHE.countries.length || !SUPER_CACHE.places.length) {
        const response = await _axios.get("/secure/places");
        const list = response.data.data.list;

        const places = mapPlaces(list);
        const countries = mapCountries(places);

        SUPER_CACHE.countries = countries;
        SUPER_CACHE.places = places;
      }

      return SUPER_CACHE.places;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  getChannels: async (placeId: string): Promise<Channel[]> => {
    try {
      if (SUPER_CACHE.channels[placeId]) {
        return SUPER_CACHE.channels[placeId];
      }

      const response = await _axios.get(`/secure/page/${placeId}/channels`);
      const channels: Channel[] = [];
      const content = response.data.data.content;

      content.forEach((list: { items: { page: Channel }[] }) => {
        list.items.forEach((item: { page: Channel }) => {
          if (item.page) channels.push(item.page);
        });
      });

      const mappedChannels = mapChannels(channels);

      SUPER_CACHE.channels[placeId] = mappedChannels;

      return mappedChannels;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  listen: async (channelId: string): Promise<Channel> => {
    try {
      return await _axios
        .get(`/listen/${channelId}/channel.mp3`, { maxRedirects: 0 })
        .catch((error) => error.response.headers.location);
    } catch (error) {
      console.error("Error fetching data:", error);
      return {} as Channel;
    }
  },
  search: async (query: string): Promise<SearchPayload> => {
    try {
      const response = await _axios.get(
        `https://radio.garden/api/search/secure?q=${query}`,
      );
      const entries = response.data.hits.hits;

      const rawCountries = await api.getCountries();
      const rawPlaces = await api.getPlaces();
      const rawChannels: Channel[] =
        entries
          ?.map((entry: Record<"_source", Channel>) => entry._source)
          .filter(
            (source: Channel & { code: string }) =>
              source.type === "channel" && source.code,
          )
          .map((channel: Required<Channel & { code: string }>) => {
            const countryId = channel?.code.toLowerCase();
            const placeSlug = createSlug(channel?.subtitle.split(", ")[0]);
            const channelId = channel.url.split("/").pop();

            return {
              ...channel,
              placeSlug,
              url: `/${countryId}/${placeSlug}/${channelId}`,
            };
          })
          .filter((channel: Required<Channel & { placeSlug: string }>) =>
            rawPlaces.some((place) => place.slug === channel.placeSlug),
          ) || [];

      return {
        countries: rawCountries
          .filter((country) =>
            country.title.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, MAX_SEARCH_RESULTS),
        places: rawPlaces
          .filter((place) =>
            place.title.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, MAX_SEARCH_RESULTS),
        channels: mapChannels(rawChannels).slice(0, MAX_SEARCH_RESULTS),
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { places: [], countries: [], channels: [] };
    }
  },
};
