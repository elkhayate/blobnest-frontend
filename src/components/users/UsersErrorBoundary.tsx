import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsersErrorBoundaryProps {
  children: React.ReactNode;
}

export function UsersErrorBoundary({ children }: UsersErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Error Loading Users</h2>
          <p className="text-muted-foreground mb-4">
            There was a problem loading the users. Please try again.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </Button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
} 