import { api } from "../../utils";

export default defineEventHandler(async (event): Promise<Place[] | unknown> => {
  try {
    setHeader(event, "Access-Control-Allow-Origin", "*");
    setHeader(event, "Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    setHeader(
      event,
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Ref"
    );

    // Handle OPTIONS request
    if (event.node.req.method === "OPTIONS") {
      setResponseStatus(event, 204);
      return "OK";
    }

    return await api.getCountries();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
