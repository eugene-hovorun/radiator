import { api } from "../../utils";

export default defineEventHandler(async (): Promise<Place[] | unknown> => {
  try {
    return await api.getCountries();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
