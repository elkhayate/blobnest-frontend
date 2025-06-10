import { FilesContent } from "@/components/files/FilesContent";
import { FilesErrorBoundary } from "@/components/files/FilesErrorBoundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Suspense } from "react";

export default function Files() {
  return (
    <FilesErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
            <FilesContent />
        </Suspense>
    </FilesErrorBoundary>
  );
} 