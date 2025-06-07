import type { GetUsersParams } from "@/types/users";

export const usersQueryKeys = {
  all: ["users"] as const,
  list: (params: GetUsersParams) => [...usersQueryKeys.all, "list", ...Object.values(params)] as const,
  details: (id: string) => [...usersQueryKeys.all, "details", id] as const,
};