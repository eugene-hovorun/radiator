import { createSlug } from "./slug";

export const mapPlaces = (places: Place[]) =>
  places.map((place) => ({
    ...place,
    slug: createSlug(place.title),
    countrySlug: createSlug(place.country),
  }));

export const mapCountries = (places: Place[]) =>
  [...new Set(places.map((place) => place.country).sort())].map(
    (country: string) => ({ title: country, slug: createSlug(country) })
  );

export const mapChannels = (channels: Channel[]) =>
  channels.map((channel) => ({
    ...channel,
    id: channel.url.split("/").pop(),
    slug: createSlug(channel.title),
  }));
