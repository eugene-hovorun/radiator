import { api } from "./api";

let SUPER_CACHE: PlacesResponse | null = null;

export const getPlaces = async () => {
  try {
    if (!SUPER_CACHE) {
      const response = await api.get<PlacesResponse>("/secure/places");
      SUPER_CACHE = response.data;
    }

    return SUPER_CACHE.data.list;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
