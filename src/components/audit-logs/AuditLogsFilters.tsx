import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AuditLogFilters, AuditLogOperation } from "@/types/audit-logs";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";

interface AuditLogsFiltersProps {
  filters: AuditLogFilters;
  onFiltersChange: (filters: AuditLogFilters) => void;
  onReset: () => void;
}

export function AuditLogsFilters({
  filters,
  onFiltersChange,
  onReset,
}: AuditLogsFiltersProps) {
  const [containerName, setContainerName] = useState(filters.containerName || "");
  const debouncedContainerName = useDebounce(containerName, 300);

  useEffect(() => {
    onFiltersChange({
      ...filters,
      containerName: debouncedContainerName || undefined,
      page: 1,
    });
  }, [debouncedContainerName]);

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Input
          placeholder="Seach audit logs..."
          value={containerName}
          onChange={(e) => setContainerName(e.target.value)}
          className="w-full md:w-[300px]"
        />

        <Select
          value={filters.operation || "all"}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              operation: value === "all" ? undefined : value as AuditLogOperation,
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Operations</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        onClick={onReset}
        type="button"
        className="w-full md:w-auto"
      >
        Reset Filters
      </Button>
    </div>
  );
}