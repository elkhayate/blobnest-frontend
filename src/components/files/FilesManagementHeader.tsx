import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import type { FileFilters } from "@/types/file";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { RoleBasedFeature } from "../RoleBasedFeature";

interface FilesManagementHeaderProps {
  filters: FileFilters;
  onFiltersChange: (filters: FileFilters) => void;
  onCreateClick: () => void;
}

export function FilesManagementHeader({
  filters,
  onFiltersChange,
  onCreateClick,
}: FilesManagementHeaderProps) {
  const [searchValue, setSearchValue] = useState(filters.search);
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    onFiltersChange({ ...filters, search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Input
          placeholder="Search files..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:w-[300px]"
        />
      </div>

      <RoleBasedFeature
        allowedRoles={["admin", "uploader"]}
        children={
          <Button onClick={onCreateClick} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Upload File
          </Button>
        }
      />
    </div>
  );
}