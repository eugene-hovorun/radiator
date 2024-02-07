import { api } from "../../utils";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;

    if (!id) {
      return { error: "Channel id is required" };
    }

    return await api.listen(id);
  } catch (error) {
    return { error };
  }
});
