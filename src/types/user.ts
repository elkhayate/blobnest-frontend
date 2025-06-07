export type UserRole = "admin" | "uploader" | "viewer";

export interface User {
    id: string;
    email: string;
    display_name: string;
    role: UserRole;
    created_at: string;
    company_name?: string;
    company_id?: string;
}

export interface UserFilters {
    search: string;
    role: UserRole | "all";
    page: number;
    rowsPerPage: number;
}

export interface UserResponse {
    users: User[];
    total: number;
}

export interface UserFormData {
    email: string;
    display_name: string;
    role: UserRole;
    password?: string;
    company_name?: string;
    company_id?: string;
} 