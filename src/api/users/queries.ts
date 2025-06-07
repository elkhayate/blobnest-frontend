import { useQuery } from "@tanstack/react-query";
import axios from "@/api/api";
import type { User, UserFilters } from "@/types/user";

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  rowsPerPage: number;
  totalPages: number;
}

export const useGetUsers = (filters: UserFilters) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      const { data } = await axios.get<UsersResponse>("/users", {
        params: filters,
      });
      return data;
    },
  });
};
