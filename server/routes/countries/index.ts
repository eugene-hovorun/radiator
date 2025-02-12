import { api } from "../../utils";

export default defineEventHandler(async (event): Promise<Place[] | unknown> => {
  try {
    if (getHeader(event, "from_radiator")) {
      setHeader(event, "Access-Control-Allow-Origin", "*");
      setHeader(event, "Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      setHeader(
        event,
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    }

    return await api.getCountries();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
