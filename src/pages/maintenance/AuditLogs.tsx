import { Suspense } from "react";
import { AuditLogsErrorBoundary } from "@/components/audit-logs/AuditLogsErrorBoundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AuditLogsContent } from "@/components/audit-logs/AuditLogsContent";

export default function AuditLogs() {
  return (
    <AuditLogsErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <AuditLogsContent />
      </Suspense>
    </AuditLogsErrorBoundary>
  );
}