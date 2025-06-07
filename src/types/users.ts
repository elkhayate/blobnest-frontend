export interface AddUser {
    email: string;
    role: string;
    display_name: string;
    password: string;
}

export interface UpdateUser {
    email: string;
    role: string;
    display_name: string;
    id: string;
}

export interface GetUsersParams {
    page: number;
    rowsPerPage: number;
    filterValue: string;
}

export interface User {
    id: string;
    email: string;
    role: string;
    display_name: string;
    created_at: string;
    company_id: string;
    company_name: string;
}


 