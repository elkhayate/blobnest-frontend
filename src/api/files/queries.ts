import { useQuery } from "@tanstack/react-query";
import axios from "@/api/api";
import type { FileFilters } from "@/types/file";

export const useGetAllFiles = (filters: FileFilters) => {
  return useQuery({
    queryKey: ["files", filters],
    queryFn: async () => {
      const { data } = await axios.get("/files", {
        params: filters,
      });
      return data;
    },
  });
};

export const useGetContainerFiles = (containerName: string) => {
  return useQuery({
    queryKey: ["files", containerName],
    queryFn: async () => {
      const { data } = await axios.get(`/files/${containerName}`);
      return data;
    },
    enabled: !!containerName,
  });
};
