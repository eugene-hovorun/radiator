import { api } from "../../utils";

export default defineEventHandler(async (event): Promise<Place[] | unknown> => {
  try {
    const countryId = event.context.params?.country;
    const data = await api.getPlaces();
    const places = data
      .filter((place: Place) => place.countryId === countryId)
      .sort((a, b) => a.title.localeCompare(b.title));

    return places;
  } catch (error) {
    return { error };
  }
});
