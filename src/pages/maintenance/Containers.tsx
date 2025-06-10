import { Suspense } from "react";
import { ContainersErrorBoundary } from "@/components/containers/ContainersErrorBoundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ContainersContent } from "@/components/containers/ContainersContent";

export default function Containers() {
  return (
    <ContainersErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <ContainersContent />
      </Suspense>
    </ContainersErrorBoundary>
  );
} 