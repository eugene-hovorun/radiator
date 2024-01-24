import { mapCountries, mapPlaces, getPlaces } from "../../utils";

export default defineEventHandler(async (): Promise<Place[] | unknown> => {
  try {
    const list = (await getPlaces()) || [];
    const places = mapPlaces(list);
    const countries = mapCountries(places);

    return countries;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
