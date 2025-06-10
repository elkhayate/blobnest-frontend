import { useState } from "react";
import { toast } from "sonner";
import { FilesManagementHeader } from "./FilesManagementHeader";
import { FilesManagementTable } from "./FilesManagementTable";
import { CreateFileDialog } from "./CreateFileDialog";
import { EditFileDialog } from "./EditFileDialog";
import { DeleteFileDialog } from "./DeleteFileDialog";
import { Pagination } from "@/components/ui/pagination";
import { useGetAllFiles } from "@/api/files/queries";
import { useUploadFile, useUpdateFile, useDeleteFile } from "@/api/files/mutations";
import type { FileMetadata, FileFilters, CreateFileFormData, UpdateFileFormData } from "@/types/file";
import { LoadingSpinner } from "../ui/loading-spinner";

const defaultFilters: FileFilters = {
  search: "",
  contentType: "",
  page: 1,
  rowsPerPage: 10,
};

export function FilesContent() {
  const [filters, setFilters] = useState<FileFilters>(defaultFilters);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null);

  const { data: filesData, isLoading } = useGetAllFiles(filters);
  const uploadFile = useUploadFile();
  const updateFile = useUpdateFile();
  const deleteFile = useDeleteFile();

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEditClick = (file: FileMetadata) => {
    setSelectedFile(file);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (file: FileMetadata) => {
    setSelectedFile(file);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateSubmit = async (data: CreateFileFormData) => {
    try {
      await uploadFile.mutateAsync({
        containerName: data.containerName,
        file: data.file,
        metadata: data.metadata,
      });
      toast.success("File uploaded successfully");
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("Failed to upload file");
      console.error(error);
    }
  };

  const handleEditSubmit = async (data: UpdateFileFormData) => {
    if (!selectedFile) return;

    try {
      await updateFile.mutateAsync({
        containerName: selectedFile.containerName,
        fileName: selectedFile.name,
        ...data,
      }, {
        onSuccess: () => {
          toast.success("File updated successfully");
          setIsEditDialogOpen(false);
        } 
      });
    } catch (error) {
      toast.error("Failed to update file");
      console.error(error);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedFile) return;

    try {
      await deleteFile.mutateAsync({
        containerName: selectedFile.containerName,
        fileName: selectedFile.name,
      }, {
        onSuccess: () => {
          toast.success("File deleted successfully");
          setIsDeleteDialogOpen(false);
        }
      });
    } catch (error) {
      toast.error("Failed to delete file");
      console.error(error);
    }
  };

  const handleFiltersChange = (newFilters: FileFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };
 
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      <FilesManagementHeader
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onCreateClick={handleCreateClick}
      />

      <FilesManagementTable
        files={filesData?.files || []}
        isLoading={isLoading}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {filesData && filesData.total > filters.rowsPerPage && (
        <div className="flex justify-center">
          <Pagination
            currentPage={filters.page}
            totalPages={filesData.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <CreateFileDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <EditFileDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
        file={selectedFile}
      />

      <DeleteFileDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteSubmit}
        file={selectedFile}
      />
    </div>
  );
} 