// import { fileURLToPath } from "url";
// import { dirname } from "path";
import {
  api,
  // readFromFile,
  mapCountries,
  mapPlaces,
  // COUNTRIES_FILE_NAME,
  // PLACES_FILE_NAME,
} from "../../utils";
// import fs from "fs";
// import path from "path";

// const currentFilePath = fileURLToPath(import.meta.url);
// const COUNTRIES_FILE_PATH = path.join(
//   dirname(currentFilePath),
//   COUNTRIES_FILE_NAME
// );
// const PLACES_FILE_PATH = path.join(dirname(currentFilePath), PLACES_FILE_NAME);

async function fetchDataAndUpdateCache() {
  try {
    // console.log("fetchDataAndUpdateCache");
    const response = await api.get<PlacesResponse>("/secure/places");
    const places = mapPlaces(response.data.data.list)

    const countries = mapCountries(places);

    return countries

    // fs.writeFileSync(COUNTRIES_FILE_PATH, JSON.stringify(countries, null, 2));
    // fs.writeFileSync(PLACES_FILE_PATH, JSON.stringify(places, null, 2));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// setInterval(fetchDataAndUpdateCache, 4 * 60 * 60 * 1000);

export default defineEventHandler(async (): Promise<Place[] | unknown> => {
  try {
    // const countries = readFromFile("COUNTRIES.json");

    // if (countries) {
    //   return countries;
    // }

    return await fetchDataAndUpdateCache();

    // return readFromFile("COUNTRIES.json") || [];
  } catch (error) {
    return { error };
  }
});
