import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

import type { Container } from "@/types/container";
import React from "react";
import { RoleBasedFeature } from "../RoleBasedFeature";

interface ContainerManagementTableProps {
  containers: Container[];
  isLoading: boolean;
  onEditClick: (container: Container) => void;
  onDeleteClick: (container: Container) => void;
}

export function ContainerManagementTable({
  containers,
  isLoading,
  onEditClick,
  onDeleteClick,
}: ContainerManagementTableProps) {
  const getPublicAccessBadgeColor = (access: string | undefined) => {
    switch (access) {
      case "blob":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "container":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
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

  if (containers.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-muted-foreground">
        No containers found
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
              <TableHead>Name</TableHead>
              <TableHead>Public Access</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Blob Count</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Metadata</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {containers.map((container) => (
              <TableRow key={container.accountName}>
                <TableCell>{container.accountName}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`text-xs px-2 py-1 rounded-full capitalize ${getPublicAccessBadgeColor(container.publicAccess)}`}>
                    {container.publicAccess || "none"}
                  </Badge>
                </TableCell>
                <TableCell>{container.totalSize}</TableCell>
                <TableCell>{container.blobCount}</TableCell>
                <TableCell>
                  {new Date(container.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(container.lastModified).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {Object.keys(container.metadata).length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 max-w-xs">
                      {Object.entries(container.metadata).map(([key, value]) => (
                        <React.Fragment key={key}>
                          <span className="text-xs font-semibold text-muted-foreground truncate">{key}:</span>
                          <span className="text-xs text-foreground break-all">{value}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No metadata</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <RoleBasedFeature
                      allowedRoles={["admin", "uploader"]}
                      children={
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => onEditClick(container)}
                          aria-label="Edit container"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <RoleBasedFeature
                      allowedRoles={["admin"]}
                      children={
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => onDeleteClick(container)}
                          aria-label="Delete container"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {containers.map((container) => (
          <div key={container.accountName} className="p-4 space-y-4 rounded-md border bg-background">
            <div className="flex items-start justify-between gap-2 flex-wrap border-b pb-2 mb-2">
              <div className="min-w-0">
                <h3 className="font-medium break-words text-lg">{container.accountName}</h3>
                <p className="text-sm text-muted-foreground break-words">
                  {container.totalSize} • {container.blobCount} blobs
                </p>
              </div>
              <Badge variant="secondary" className={`text-xs px-2 py-1 rounded-full capitalize ${getPublicAccessBadgeColor(container.publicAccess)} whitespace-nowrap`}>
                {container.publicAccess || "none"}
              </Badge>
            </div>
            <div className={`flex flex-row justify-between pb-2 mb-2 ${Object.keys(container.metadata).length > 0 ? "border-b" : ""}`}>
              <p className="text-sm text-muted-foreground break-words">
                Created {new Date(container.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground break-words">
                Modified {new Date(container.lastModified).toLocaleDateString()}
              </p>
            </div>
            {Object.keys(container.metadata).length > 0 && (
              <div className="mb-2">
                <p className="text-sm font-medium mb-1">Metadata:</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {Object.entries(container.metadata).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <span className="text-xs font-semibold text-muted-foreground truncate">{key}:</span>
                      <span className="text-xs text-foreground break-all">{value}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-end pt-2 gap-2">
              <RoleBasedFeature
                allowedRoles={["admin", "uploader"]}
                children={
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => onEditClick(container)}
                    aria-label="Edit container"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                }
              />
              <RoleBasedFeature
                allowedRoles={["admin"]}
                children={
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDeleteClick(container)}
                    aria-label="Delete container"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 