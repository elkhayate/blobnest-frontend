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

const MOCK_LOGS = [
  {
    timestamp: "2024-01-20T10:30:00Z",
    container: "images",
    blob: "profile/avatar.jpg",
    operation: "Upload",
    details: {
      api: "PutBlob",
      clientRequestId: "client-123",
      requestId: "req-456",
      etag: "0x8D9F7B5E2A1C4D3",
      contentType: "image/jpeg",
      contentLength: 52428,
      blobType: "BlockBlob",
      url: "https://storage.blob.core.windows.net/images/profile/avatar.jpg",
      sequencer: "000000000000000100"
    }
  },
  {
    timestamp: "2024-01-20T09:15:00Z", 
    container: "documents",
    blob: "contracts/agreement.pdf",
    operation: "Delete",
    details: {
      api: "DeleteBlob",
      clientRequestId: "client-789",
      requestId: "req-012",
      etag: "0x8D9F7B5E2A1C4D4",
      contentType: "application/pdf",
      contentLength: 105000,
      blobType: "BlockBlob",
      url: "https://storage.blob.core.windows.net/documents/contracts/agreement.pdf",
      sequencer: "000000000000000200"
    }
  }
];

export function AuditLogsContent() {
  const [filters, setFilters] = useState<AuditLogFilters>(DEFAULT_FILTERS);
  const { data, isLoading, error } = useGetAuditLogs(filters);

  const mockData = {
    logs: MOCK_LOGS,
    total: MOCK_LOGS.length,
    page: filters.page,
    rowsPerPage: filters.rowsPerPage,
    totalPages: Math.ceil(MOCK_LOGS.length / filters.rowsPerPage)
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (error) {
    throw error;
  }

  return (
    <div className="container mx-auto px-1 py-2 md:px-4 md:py-8">
      <AuditLogsFilters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      <div className="mt-6 md:mt-8">
        <AuditLogsTable logs={(data?.logs || mockData.logs) as unknown as AuditLog[]} isLoading={isLoading} />

        {mockData.totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={filters.page}
              totalPages={mockData.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}