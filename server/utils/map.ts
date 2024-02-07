import { createSlug } from "./slug";
import { colorsMap } from "./data/colorsMap";
import { isoMap } from "./data/isoMap";

export const mapPlaces = (places: Place[]) =>
  places.map((place) => {
    const countrySlug = createSlug(place.country);
    const countryId = isoMap[countrySlug] || "";

    return {
      ...place,
      slug: createSlug(place.title),
      countryId: countryId.toLowerCase(),
    };
  });

export const mapCountries = (places: Place[]) =>
  [...new Set(places.map((place) => place.country).sort())].map(
    (country: string) => {
      const slug = createSlug(country);
      const colors = colorsMap[slug]?.colors || [];
      const id = isoMap[slug] || "";

      return {
        title: country,
        id: id.toLowerCase(),
        colors,
        slug,
      };
    },
  );

export const mapChannels = (channels: Channel[]): Channel[] =>
  channels.map((channel, index) => ({
    ...channel,
    id: channel.url.split("/").pop() || index.toString(),
    slug: createSlug(channel.title),
  }));
