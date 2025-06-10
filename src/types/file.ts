export interface FileMetadata {
  name: string;
  contentType: string;
  size: string;
  lastModified: string;
  createdOn: string;
  rawMetadata: Record<string, string>;
  metadata: Record<string, string>;
  url: string;
  containerName: string;
  previewUrl: string | null;
}

export interface FileFilters {
  search: string;
  contentType: string;
  page: number;
  rowsPerPage: number;
}

export interface CreateFileFormData {
  containerName: string;
  file: globalThis.File;
  metadata?: Record<string, string>;
}

export interface UpdateFileFormData {
  metadata: Record<string, string>;
  contentType?: string;
}

export interface FileFilters {
  search: string;
  contentType: string;
  page: number;
  rowsPerPage: number;
}

export interface File {
  name: string;
}


export interface UploadFileData {
    containerName: string;
    file: File;
    metadata?: Record<string, string>;
  }
  
export interface UpdateFileData {
    containerName: string;
    fileName: string;
    metadata?: Record<string, string>;
    contentType?: string;
  }