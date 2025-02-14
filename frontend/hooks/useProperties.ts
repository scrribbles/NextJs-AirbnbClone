import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listings } from "@/services/listingServices";

export function useProperties() {
  return useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const [status, data] = await listings.allProperties("");
      return [status, data];
    },
    staleTime: 1000 * 60 * 5,
  });
}
