export type AuditLogOperation = "create" | "update" | "delete" | "read";

export interface AuditLog {
  timestamp: string;
  containerName: string;
  operation: AuditLogOperation;
  userId: string;
  userName: string;
  details: Record<string, any>;
}

export interface AuditLogFilters {
  containerName?: string;
  operation?: AuditLogOperation | "all";
  page: number;
  rowsPerPage: number;
}

export interface AuditLogsResponse {
  logs: AuditLog[];
  total: number;
  page: number;
  rowsPerPage: number;
  totalPages: number;
} 