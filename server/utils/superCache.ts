import { api } from "./api";
import { mapCountries, mapPlaces } from "./map";

const SUPER_CACHE: {
  countries: Country[];
  places: Place[];
} = {
  countries: [],
  places: [],
};

export const getPlaces = async (): Promise<Place[]> => {
  try {
    if (!SUPER_CACHE.countries.length || !SUPER_CACHE.places.length) {
      const response = await api.get<PlacesResponse>("/secure/places");
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
};

export const getCountries = async () => {
  try {
    if (!SUPER_CACHE.countries.length || !SUPER_CACHE.places.length) {
      await getPlaces();
    }

    return SUPER_CACHE.countries;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
