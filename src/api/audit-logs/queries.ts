import { useQuery } from "@tanstack/react-query";
import axios from "@/api/api";
import type { AuditLogFilters, AuditLogsResponse } from "@/types/audit-logs";

export const useGetAuditLogs = (filters: AuditLogFilters) => {
  return useQuery({
    queryKey: ["audit-logs", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.containerName) params.append("containerName", filters.containerName);
      if (filters.operation) params.append("operation", filters.operation);
      params.append("page", filters.page.toString());
      params.append("rowsPerPage", filters.rowsPerPage.toString());

      const { data } = await axios.get(`/audit-logs?${params.toString()}`);
      return data as AuditLogsResponse;
    },
  });
}; 