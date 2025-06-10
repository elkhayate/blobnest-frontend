import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/api/api";
import type { CreateContainerFormData, UpdateContainerFormData } from "@/types/container";

export function useCreateContainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateContainerFormData) => {
      const response = await axios.post("/containers", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containers"] });
    }, 
  });
}

export function useUpdateContainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ containerName, data }: { containerName: string; data: UpdateContainerFormData }) => {
      const response = await axios.put(`/containers/${containerName}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containers"] });
    },
  });
}

export function useDeleteContainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (containerName: string) => {
      const response = await axios.delete(`/containers/${containerName}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containers"] });
    },
  });
}
