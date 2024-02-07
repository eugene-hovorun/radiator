import { api } from "../../utils";

const EMPTY_SEARCH_PAYLOAD = { channels: [], countries: [], places: [] };

export default defineEventHandler(async (event): Promise<SearchPayload> => {
  try {
    const param = event.context.params?.query;

    if (!param) {
      return EMPTY_SEARCH_PAYLOAD;
    }

    const query = param.split("___").join(" ");

    return await api.search(query);
  } catch (error) {
    console.error("Error fetching data:", error);
    return EMPTY_SEARCH_PAYLOAD;
  }
});
