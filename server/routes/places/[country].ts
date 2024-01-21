import { fileURLToPath } from "url";
import { dirname } from "path";
import { api, readFromFile, mapPlaces, PLACES_FILE_NAME } from "../../utils";
import fs from "fs";
import path from "path";

const currentFilePath = fileURLToPath(import.meta.url);
const CACHE_FILE_PATH = path.join(dirname(currentFilePath), PLACES_FILE_NAME);

async function fetchDataAndUpdateCache() {
  try {
    const response = await api.get<PlacesResponse>("/secure/places");
    const data = mapPlaces(response.data.data.list);

    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// fetchDataAndUpdateCache();
// Schedule cache update every 4 hours
setInterval(fetchDataAndUpdateCache, 4 * 60 * 60 * 1000);

export default defineEventHandler(async (event): Promise<Place[] | unknown> => {
  try {
    const countrySlug = event.context.params?.country;
    const cachedData = readFromFile(PLACES_FILE_NAME);

    if (!cachedData) {
      await fetchDataAndUpdateCache();
    }

    const data = cachedData || readFromFile(PLACES_FILE_NAME);
    const places = data.filter((place: Place) => place.countrySlug === countrySlug);

    return places
  } catch (error) {
    return { error };
  }
});
