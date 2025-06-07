import type { UserFilters } from "@/types/user";

export const usersQueryKeys = {
  all: ["users"] as const,
  list: (filters: UserFilters) => [...usersQueryKeys.all, "list", filters] as const,
  details: (id: string) => [...usersQueryKeys.all, "details", id] as const,
};