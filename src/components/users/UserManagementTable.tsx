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
import type { User } from "@/types/user";
import { RoleBasedFeature } from "../RoleBasedFeature";
import { Card } from "@/components/ui/card";

interface UserManagementTableProps {
  users: User[];
  isLoading: boolean;
  onEditClick: (user: User) => void;
  onDeleteClick: (user: User) => void;
}

export function UserManagementTable({
  users,
  isLoading,
  onEditClick,
  onDeleteClick,
}: UserManagementTableProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "uploader":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
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

  if (users.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-muted-foreground">
        No users found
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
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.display_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`text-xs px-2 py-1 rounded-full capitalize ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <RoleBasedFeature
                      allowedRoles={["admin"]}
                      children={
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => onEditClick(user)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>} />
                    <RoleBasedFeature
                      allowedRoles={["admin"]}
                      children={
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => onDeleteClick(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
          {users.map((user) => (
            <Card key={user.id} className="rounded-md border bg-background p-4">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="min-w-0">
                  <h3 className="font-medium break-words">{user.display_name}</h3>
                  <p className="text-sm text-muted-foreground break-words">{user.email}</p>
                </div>
                <Badge variant="secondary" className={`text-xs px-2 py-1 rounded-full capitalize ${getRoleBadgeColor(user.role)} whitespace-nowrap`}>
                  {user.role}
                </Badge>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 mt-3">
                <p className="text-sm text-muted-foreground break-words">
                  Created {new Date(user.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <RoleBasedFeature
                    allowedRoles={["admin"]}
                    children={
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => onEditClick(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>} />
                  <RoleBasedFeature
                    allowedRoles={["admin"]}
                    children={
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDeleteClick(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>} />
                </div>
              </div>
          </Card>
        ))}
      </div>
    </div>
  );
}