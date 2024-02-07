import axios from "axios";
import { mapChannels, mapCountries, mapPlaces } from "./map";

const SUPER_CACHE: {
  countries: Country[];
  places: Place[];
  channels: { [key: string]: Channel[] };
} = {
  countries: [],
  places: [],
  channels: {},
};

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
};
