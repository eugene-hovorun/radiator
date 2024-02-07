import { api } from "../../utils";

export default defineEventHandler(async (event) => {
  try {
    const placeId = event.context.params?.id;

    if (!placeId) {
      return { error: "Place ID is required" };
    }

    return await api.getChannels(placeId);
  } catch (error) {
    return { error };
  }
});
