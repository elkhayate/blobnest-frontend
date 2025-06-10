import { useState } from "react";
import { toast } from "sonner";
import { ContainerManagementHeader } from "@/components/containers/ContainerManagementHeader";
import { ContainerManagementTable } from "@/components/containers/ContainerManagementTable";
import { CreateContainerDialog } from "@/components/containers/CreateContainerDialog";
import { EditContainerDialog } from "@/components/containers/EditContainerDialog";
import { DeleteContainerDialog } from "@/components/containers/DeleteContainerDialog";
import { Pagination } from "@/components/ui/pagination";
import { useCreateContainer, useUpdateContainer, useDeleteContainer } from "@/api/containers/mutations";
import { useGetContainers } from "@/api/containers/queries";
import type { Container, ContainerFilters, CreateContainerFormData, UpdateContainerFormData } from "@/types/container";

const DEFAULT_FILTERS: ContainerFilters = {
  search: "",
  page: 1,
  rowsPerPage: 10,
};

export function ContainersContent() {
  const [filters, setFilters] = useState<ContainerFilters>(DEFAULT_FILTERS);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);

  const { data, isLoading, error } = useGetContainers(filters);
  const createContainer = useCreateContainer();
  const updateContainer = useUpdateContainer();
  const deleteContainer = useDeleteContainer();

  const handleCreateContainer = async (formData: CreateContainerFormData) => {
    try {
      await createContainer.mutateAsync(formData, {
        onSuccess: () => {
          toast.success("Container created successfully");
          setIsCreateDialogOpen(false);
        }
      });
    } catch (error) {
      toast.error("Failed to create container");
    }
  };

  const handleUpdateContainer = async (formData: UpdateContainerFormData) => {
    if (!selectedContainer) return;

    try {
      await updateContainer.mutateAsync({
        containerName: selectedContainer.accountName,
        data: formData,
      }, {
        onSuccess: () => {
          toast.success("Container updated successfully");
          setIsEditDialogOpen(false);
        }
      });
    } catch (error) {
      toast.error("Failed to update container");
    }
  };

  const handleDeleteContainer = async () => {
    if (!selectedContainer) return;

    try {
      await deleteContainer.mutateAsync(selectedContainer.accountName, {
        onSuccess: () => {
          if (data?.containers.length === 1 && filters.page > 1) {
            setFilters((prev) => ({ ...prev, page: filters.page - 1 }));
          }
          toast.success("Container deleted successfully");
          setIsDeleteDialogOpen(false);
        }
      });
    } catch (error) {
      toast.error("Failed to delete container");
    }
  };

  const handleEditClick = (container: Container) => {
    setSelectedContainer(container);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (container: Container) => {
    setSelectedContainer(container);
    setIsDeleteDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (error) {
    throw error;
  }

  return (
    <div className="container mx-auto px-1 py-2 md:px-4 md:py-8">
      <ContainerManagementHeader
        filters={filters}
        onFiltersChange={setFilters}
        onCreateClick={() => setIsCreateDialogOpen(true)}
      />

      <div className="mt-6 md:mt-8">
        <ContainerManagementTable
          containers={data?.containers || []}
          isLoading={isLoading}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

        {data && data.totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={filters.page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <CreateContainerDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateContainer}
      />

      <EditContainerDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleUpdateContainer}
        container={selectedContainer}
      />

      <DeleteContainerDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteContainer}
        container={selectedContainer}
      />
    </div>
  );
} 