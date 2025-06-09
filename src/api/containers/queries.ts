import { useQuery } from "@tanstack/react-query";
import axios from "@/api/api";

export const useGetContainers = () => {
  return useQuery({
    queryKey: ["containers"],
    queryFn: async () => {
      const { data } = await axios.get("/containers");
      return data;
    },
  });
};