import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/api/api";
import type { UploadFileData, UpdateFileData } from "@/types/file";

export function useUploadFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ containerName, file, metadata }: UploadFileData) => {
      const formData = new FormData();
      formData.append("file", file as unknown as Blob);
      formData.append("containerName", containerName);
      formData.append("metadata", JSON.stringify(metadata));
      if (metadata) {
        Object.entries(metadata).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      const response = await axios.post(`/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (_, { containerName }) => {
      queryClient.invalidateQueries({ queryKey: ["files", containerName] });
      queryClient.invalidateQueries({ queryKey: ["files", "all"] });
      queryClient.invalidateQueries({ queryKey: ["files" ], exact: false });

    },
  });
}

export function useUpdateFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ containerName, fileName, metadata, contentType }: UpdateFileData) => {
      const response = await axios.put(`/files/${containerName}/${fileName}`, { metadata, contentType });
      return response.data;
    },
    onSuccess: (_, { containerName }) => {
      queryClient.invalidateQueries({ queryKey: ["files", containerName] });
      queryClient.invalidateQueries({ queryKey: ["files", "all"] });
      queryClient.invalidateQueries({ queryKey: ["files" ], exact: false });

    },
  });
}

export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ containerName, fileName }: { containerName: string; fileName: string }) => {
      const response = await axios.delete(`/files/${containerName}/${fileName}`);
      return response.data;
    },
    onSuccess: (_, { containerName }) => {
      queryClient.invalidateQueries({ queryKey: ["files", containerName] });
      queryClient.invalidateQueries({ queryKey: ["files", "all"] ,});
      queryClient.invalidateQueries({ queryKey: ["files" ], exact: false });

    },
  });
} 