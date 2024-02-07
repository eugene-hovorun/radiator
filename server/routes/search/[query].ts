import { getPlaces, getCountries } from "../../utils";

export default defineEventHandler(async (event): Promise<Place[] | unknown> => {
  try {
    const param = event.context.params?.query;

    if (!param) {
      return [];
    }

    const query = param.split("-").join(" ");

    const places = await getPlaces();
    const countries = await getCountries();

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
