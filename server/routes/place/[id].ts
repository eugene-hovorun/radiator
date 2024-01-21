import { api, mapChannels } from "../../utils";

export default defineEventHandler(async (event) => {
  try {
    const placeId = event.context.params?.id;

    if (!placeId) {
      return { error: "Place ID is required" };
    }

    const response = await api.get(`/secure/page/${placeId}/channels`);
    const channels: Channel[] = [];
    const content = response.data.data.content;

    content.forEach((list: { items: { page: Channel }[] }) => {
      list.items.forEach((item: { page: Channel }) => {
        if (item.page) channels.push(item.page);
      });
    });

    return mapChannels(channels);
  } catch (error) {
    return { error };
  }
});
