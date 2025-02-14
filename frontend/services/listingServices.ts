import { reqFlow } from "@/lib/axiosApi";
import endpoints from "@/config/endpoints";

export const listings = Object.freeze({
  allProperties: async function getProperties(type: string) {
    const { status, data } = await reqFlow(
      endpoints.properties.ALL_PROPERTIES(type),
      "GET"
    );

    // optionally dispatch to store, but before that is implemented, return data
    return [status, data];
  },
});
