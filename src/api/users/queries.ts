import { useQuery } from "@tanstack/react-query";
import axios from "@/api/api";
import type { UserFilters } from "@/types/user";

 

export const useGetUsers = (filters: UserFilters) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      const { data } = await axios.get("/users", {
        params: filters,
      });
      return data;
    },
  });
};

export const useGetUserAndCompany = () => {
  return useQuery({
    queryKey: ["user-and-company-info"],
    queryFn: async () => {
      const { data } = await axios.get("/users/user-and-company-info");
      return data;
    }
  });
};
