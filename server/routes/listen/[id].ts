import { api } from "../../utils";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;

    if (!id) {
      return { error: "Channel id is required" };
    }

    return await api
      .get(`/listen/${id}/channel.mp3`, { maxRedirects: 0 })
      .catch((error) => error.response.headers.location);
  } catch (error) {
    return { error };
  }
});
