import { getCountries } from "../../utils";

export default defineEventHandler(async (): Promise<Place[] | unknown> => {
  try {
    return await getCountries();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
