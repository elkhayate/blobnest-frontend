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
import { Pencil, Trash2, FileText, Image, File, Eye } from "lucide-react";
import type { FileMetadata } from "@/types/file";
import React from "react";
import { RoleBasedFeature } from "../RoleBasedFeature";

interface FilesManagementTableProps {
    files: FileMetadata[];
    isLoading: boolean;
    onEditClick: (file: FileMetadata) => void;
    onDeleteClick: (file: FileMetadata) => void;
}

const getFileIcon = (contentType?: string) => {
    if (contentType?.startsWith('image/')) {
        return <Image className="h-4 w-4" />;
    }
    if (contentType?.includes('pdf') ||
        contentType?.includes('document') ||
        contentType?.includes('text')) {
        return <FileText className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const handlePreview = async (file: FileMetadata) => {
    try {
        const url = file.previewUrl || file.url;
        if (!url) {
            throw new Error('No download URL available');
        }
        window.open(url, '_blank');
    } catch (error) {
        console.error("Failed to download file:", error);
    }
};

function FileRow({ file, onEditClick, onDeleteClick }: {
    file: FileMetadata;
    onEditClick: (file: FileMetadata) => void;
    onDeleteClick: (file: FileMetadata) => void;
}) {
    return (
        <TableRow>
            <TableCell className="font-medium max-w-[200px]">
                <div className="flex items-center gap-2">
                    {getFileIcon(file.contentType)}
                    <span className="truncate" title={file.name}>{file.name}</span>
                </div>
            </TableCell>
            <TableCell>{file.contentType}</TableCell>
            <TableCell>{file.size}</TableCell>
            <TableCell className="max-w-[150px]">
                <span className="truncate block" title={file.containerName}>{file.containerName}</span>
            </TableCell>
            <TableCell>{formatDate(file.lastModified)}</TableCell>
            <TableCell>
                {file.rawMetadata && Object.keys(file.rawMetadata).length > 0 && (
                    <div className="max-w-[200px]">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                            {Object.entries(file.rawMetadata).map(([key, value]) => (
                                <React.Fragment key={key}>
                                    <span className="text-xs font-semibold text-muted-foreground truncate">{key}:</span>
                                    <span className="text-xs text-foreground break-all">{value}</span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </TableCell>
            <TableCell>
                <div className="flex gap-2">
                    <RoleBasedFeature
                        allowedRoles={["admin", "uploader", "viewer"]}
                        children={
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={() => handlePreview(file)}
                                title="Preview"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        }
                    />
                    <RoleBasedFeature
                        allowedRoles={["admin", "uploader"]}
                        children={
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={() => onEditClick(file)}
                                title="Edit"
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                        }
                    />
                    <RoleBasedFeature
                        allowedRoles={["admin", "uploader"]}
                        children={
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => onDeleteClick(file)}
                                title="Delete"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        }
                    />
                </div>
            </TableCell>
        </TableRow>
    );
}

export function FilesManagementTable({
    files,
    isLoading,
    onEditClick,
    onDeleteClick,
}: FilesManagementTableProps) {
    if (isLoading) {
        return (
            <div className="flex h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (files.length === 0) {
        return (
            <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                No files found
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
                            <TableHead>Type</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Container</TableHead>
                            <TableHead>Last Modified</TableHead>
                            <TableHead>Metadata</TableHead>
                            <TableHead className="w-[150px] text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {files.map((file) => (
                            <FileRow
                                key={`${file.containerName}/${file.name}`}
                                file={file}
                                onEditClick={onEditClick}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4">
                {files.map((file) => (
                    <div key={`${file.containerName}/${file.name}`} className="p-4 space-y-4 rounded-md border bg-background">
                        <div className="flex items-start justify-between gap-2 flex-wrap border-b pb-2 mb-2">
                            <div className="min-w-0 flex-1">
                                <h3 className="font-medium break-words text-lg flex items-center gap-2">
                                    {getFileIcon(file.contentType)}
                                    <span className="truncate" title={file.name}>{file.name}</span>
                                </h3>
                                <p className="text-sm text-muted-foreground break-words">
                                    {file.size} • {file.contentType}
                                </p>
                            </div>
                            <Badge variant="secondary" className="text-xs px-2 py-1 rounded-full whitespace-nowrap max-w-[150px] truncate" title={file.containerName}>
                                {file.containerName}
                            </Badge>
                        </div>

                        <div className="flex flex-row justify-between pb-2 mb-2">
                            <p className="text-sm text-muted-foreground break-words">
                                Modified {formatDate(file.lastModified)}
                            </p>
                        </div>
                        {file.rawMetadata && Object.keys(file.rawMetadata).length > 0 && (
                            <div className="mb-2">
                                <p className="text-sm font-medium mb-1">Metadata:</p>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                                    {Object.entries(file.rawMetadata).map(([key, value]) => (
                                        <React.Fragment key={key}>
                                            <span className="text-xs font-semibold text-muted-foreground truncate">{key}:</span>
                                            <span className="text-xs text-foreground break-all">{value}</span>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}

                        {file.previewUrl && file.contentType?.startsWith('image/') && (
                            <div className="mb-2">
                                <img
                                    src={file.previewUrl || file.url}
                                    alt={file.name}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            </div>
                        )}
                        {file.url && file.contentType?.includes('pdf') && (
                            <div className="mb-2">
                                <iframe
                                    src={file.url}
                                    title={file.name}
                                    className="w-full h-96 rounded-md"
                                />
                            </div>
                        )}
                        <div className="flex justify-end pt-2 gap-2">
                            <RoleBasedFeature
                                allowedRoles={["admin", "uploader", "viewer"]}
                                children={
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        onClick={() => handlePreview(file)}
                                        title="Preview"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                }
                            />
                            <RoleBasedFeature
                                allowedRoles={["admin", "uploader"]}
                                children={
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        onClick={() => onEditClick(file)}
                                        title="Edit"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                }
                            />
                            <RoleBasedFeature
                                allowedRoles={["admin", "uploader"]}
                                children={
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => onDeleteClick(file)}
                                        title="Delete"
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