import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AuditLog } from "@/types/audit-logs";
import React from "react";

interface AuditLogsTableProps {
  logs: AuditLog[];
  isLoading: boolean;
}

export function AuditLogsTable({ logs, isLoading }: AuditLogsTableProps) {
  const getOperationBadgeColor = (operation: string) => {
    switch (operation) {
      case "create":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "update":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "delete":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "read":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-muted-foreground">
        No audit logs found
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Operation</TableHead>
              <TableHead>Container</TableHead>
 
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={`${log.timestamp}-${index}`}>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`text-xs px-2 py-1 rounded-full capitalize ${getOperationBadgeColor(log.operation)}`}>
                    {log.operation}
                  </Badge>
                </TableCell>
                <TableCell>{log.containerName}</TableCell>
              
                <TableCell>
                  {Object.keys(log.details).length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 max-w-xs">
                      {Object.entries(log.details).map(([key, value]) => (
                        <React.Fragment key={key}>
                          <span className="text-xs font-semibold text-muted-foreground truncate">{key}:</span>
                          <span className="text-xs text-foreground break-all">{JSON.stringify(value)}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No details</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {logs.map((log, index) => (
          <div key={`${log.timestamp}-${index}`} className="p-4 space-y-4 rounded-md border bg-background">
            <div className="flex items-start justify-between gap-2 flex-wrap border-b pb-2 mb-2">
              <div className="min-w-0">
                <h3 className="font-medium break-words text-lg">{log.containerName}</h3>
                <p className="text-sm text-muted-foreground break-words">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
              <Badge variant="secondary" className={`text-xs px-2 py-1 rounded-full capitalize ${getOperationBadgeColor(log.operation)} whitespace-nowrap`}>
                {log.operation}
              </Badge>
            </div>
            {Object.keys(log.details).length > 0 && (
              <div className="mb-2">
                <p className="text-sm font-medium mb-1">Details:</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {Object.entries(log.details).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <span className="text-xs font-semibold text-muted-foreground truncate">{key}:</span>
                      <span className="text-xs text-foreground break-all">{JSON.stringify(value)}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 