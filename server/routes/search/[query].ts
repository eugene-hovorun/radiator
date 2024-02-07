import { api } from "../../utils";

export default defineEventHandler(async (event): Promise<Place[] | unknown> => {
  try {
    const param = event.context.params?.query;

    if (!param) {
      return [];
    }

    const query = param.split("___").join(" ");

    const places = await api.getPlaces();
    const countries = await api.getCountries();

    const filteredCountries = countries.filter((country) =>
      country.title.toLowerCase().includes(query.toLowerCase()),
    );
    const filteredPlaces = places.filter((place) =>
      place.title.toLowerCase().includes(query.toLowerCase()),
    );

    return [...filteredCountries, ...filteredPlaces].slice(0, 42);
  } catch (error) {
    return { error };
  }
});
