export type PublicAccessType = "blob" | "container";

export interface Container {
  accountName: string;
  isHttps: boolean;
  totalSize: string;
  blobCount: number;
  createdAt: string;
  lastModified: string;
  publicAccess?: PublicAccessType;
  metadata: Record<string, string>;
}

export interface ContainerFilters {
  search: string;
  page: number;
  rowsPerPage: number;
}

export interface CreateContainerFormData {
  name: string;
  publicAccess?: PublicAccessType;
}

export interface UpdateContainerFormData {
  publicAccess?: PublicAccessType;
  metadata?: Record<string, string>;
} 