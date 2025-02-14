import { reqFlow } from "@/lib/axiosApi";
import endpoints from "@/config/endpoints";

export const favorites = Object.freeze({
  allFavorites: async () => reqFlow(endpoints.favorites.ALL_FAVORITES(), "GET"),
  addToFavorites: async (x: string) =>
    reqFlow(endpoints.favorites.ADD_FAVORITE(x), "POST"),
  removeFavorites: async (x: string) =>
    reqFlow(endpoints.favorites.REMOVE_FAVORITE(x), "DELETE"),
});
