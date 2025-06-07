import { useState } from "react";
import { toast } from "sonner";
import { UserManagementHeader } from "@/components/users/UserManagementHeader";
import { UserManagementTable } from "@/components/users/UserManagementTable";
import { CreateUserDialog } from "@/components/users/CreateUserDialog";
import { EditUserDialog } from "@/components/users/EditUserDialog";
import { DeleteUserDialog } from "@/components/users/DeleteUserDialog";
import { Pagination } from "@/components/ui/pagination";
import { useCreateUser, useUpdateUser, useDeleteUser } from "@/api/users/mutations";
import { useGetUsers } from "@/api/users/queries";
import type { User, UserFormData, UserFilters } from "@/types/user";

const DEFAULT_FILTERS: UserFilters = {
  search: "",
  role: "all",
  page: 1,
  rowsPerPage: 10,
};

export function UsersContent() {
  const [filters, setFilters] = useState<UserFilters>(DEFAULT_FILTERS);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isLoading, error } = useGetUsers(filters);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const handleCreateUser = async (formData: UserFormData) => {
    try {
      await createUser.mutateAsync(formData);
      toast.success("User created successfully");
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  const handleUpdateUser = async (formData: UserFormData) => {
    if (!selectedUser) return;

    try {
      await updateUser.mutateAsync({
        userId: selectedUser.id,
        data: formData,
      });
      toast.success("User updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser.mutateAsync(selectedUser.id, {
        onSuccess: () => {
          if (data?.users.length === 1 && filters.page > 1) {
            setFilters((prev) => ({ ...prev, page: filters.page - 1 }));
          }
        },
      });
      toast.success("User deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
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
      <UserManagementHeader
        filters={filters}
        onFiltersChange={setFilters}
        onCreateClick={() => setIsCreateDialogOpen(true)}
      />

      <div className="mt-6 md:mt-8">
        <UserManagementTable
          users={data?.users || []}
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

      <CreateUserDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateUser}
      />

      <EditUserDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleUpdateUser}
        user={selectedUser}
      />

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        user={selectedUser}
      />
    </div>
  );
} 