import { useState } from "react";
import { AuditLogsTable } from "@/components/audit-logs/AuditLogsTable";
import { AuditLogsFilters } from "@/components/audit-logs/AuditLogsFilters";
import { useGetAuditLogs } from "@/api/audit-logs/queries";
import type { AuditLog, AuditLogFilters } from "@/types/audit-logs";
import { Pagination } from "@/components/ui/pagination";

const DEFAULT_FILTERS: AuditLogFilters = {
  page: 1,
  rowsPerPage: 10,
  containerName: "",
  operation: "all"
};

 

export function AuditLogsContent() {
  const [filters, setFilters] = useState<AuditLogFilters>(DEFAULT_FILTERS);
  const { data, isLoading, error } = useGetAuditLogs(filters);

  
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (error) {
    throw error;
  }

  return (
    <div className="container mx-auto px-1 py-2 md:px-4 md:py-4">
      <AuditLogsFilters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      <div className="mt-6 md:mt-8">
        <AuditLogsTable logs={(data?.logs) as unknown as AuditLog[]} isLoading={isLoading} />

        {data?.totalPages && data?.totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination 
              currentPage={filters.page}
              totalPages={data?.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}