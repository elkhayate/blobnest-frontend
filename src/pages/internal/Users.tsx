import { Suspense } from "react";
import { UsersErrorBoundary } from "@/components/users/UsersErrorBoundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { UsersContent } from "@/components/users/UsersContent";


export default function Users() {
  return (
    <UsersErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <UsersContent />
      </Suspense>
    </UsersErrorBoundary>
  );
}