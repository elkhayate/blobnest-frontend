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
  const handleSearch = (value: string) => {
    onFiltersChange({ ...filters, search: value, page: 1 });
  };

  const handleRoleChange = (value: string) => {
    onFiltersChange({ ...filters, role: value as UserFilters["role"], page: 1 });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search users..."
          value={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-[300px]"
        />

        <Select value={filters.role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-[180px]">
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

      <Button onClick={onCreateClick}>
        <Plus className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>
  );
} 