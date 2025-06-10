import { useQuery } from "@tanstack/react-query";
import axios from "@/api/api";
import type { ContainerFilters } from "@/types/container";

export const useGetContainers = (filters: ContainerFilters) => {
  return useQuery({
    queryKey: ["containers", filters],
    queryFn: async () => {
      const { data } = await axios.get("/containers", {
        params: filters,
      });
      return data;
    },
  });
};