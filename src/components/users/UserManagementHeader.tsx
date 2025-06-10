import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { UserFilters } from "@/types/user";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { RoleBasedFeature } from "../RoleBasedFeature";

interface UserManagementHeaderProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
  onCreateClick: () => void;
}

export function UserManagementHeader({
  filters,
  onFiltersChange,
  onCreateClick,
}: UserManagementHeaderProps) {
  const [searchValue, setSearchValue] = useState(filters.search);
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    onFiltersChange({ ...filters, search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  const handleRoleChange = (value: string) => {
    onFiltersChange({ ...filters, role: value as UserFilters["role"], page: 1 });
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Input
          placeholder="Search users..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:w-[300px]"
        />

        <Select value={filters.role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="uploader">Uploader</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <RoleBasedFeature
        allowedRoles={["admin"]}
        children={
          <Button onClick={onCreateClick} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        }
      />
    </div>
  );
} 