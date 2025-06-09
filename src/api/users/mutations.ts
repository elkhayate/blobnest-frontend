import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/api/api";
import type { UserFormData, UserSettingsFormData, CompanySettingsFormData } from "@/types/user";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserFormData) => {
      const response = await axios.post("/users", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: UserFormData }) => {
      const response = await axios.put(`/users/${userId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await axios.delete(`/users/${userId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(  { queryKey: ["users"] });
    },
  });
}

export function useUpdateUserSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserSettingsFormData) => {
      const response = await axios.put("/users/settings", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-and-company-info"] });
    },
  });
} 

export function useUpdateCompanySettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CompanySettingsFormData) => {
      const response = await axios.put("/users/company-settings", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-and-company-info"] });
    },
  });
} 

