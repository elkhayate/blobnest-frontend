import { useMutation } from "@tanstack/react-query";
import axios from "../api";

 export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string; displayName: string; companyName: string }) => {
      const response = await axios.post("/auth/signup", data);
      return response.data;
    },
  });
};