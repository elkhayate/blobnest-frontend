import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "./queryKeys";
import type { GetUsersParams } from "@/types/users";
import axios from "@/api/api";

export const useGetUsers = (params: GetUsersParams) => {
    return useQuery({
        queryKey: usersQueryKeys.list(params),
        queryFn: () => axios.get("/users", { params }),
    });
};
