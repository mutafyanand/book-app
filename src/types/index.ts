interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: Record<string, any>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface MakeRequestOptions {
    method: HttpMethod;
    url: string;
    id?: string | number;
    body?: Record<string, any>;
    params?: Record<string, string | number | boolean>;
    options?: RequestOptions;
}

export interface Book {
    id: number;
    createdAt?: string;
    updatedAt?: string;
    title: string;
    author: string;
    isbn: string;
}

export type EditBook = Pick<Book, 'title' | 'author' | 'isbn'>;

interface Pagination {
    page: number;
    pageSize: number;
    totalItemCount: number;
    totalPages: number;
}

export interface ApiResponseAll {
    success: boolean;
    message: string;
    data?: {
        books: Book[];
        pagination: Pagination;
    };
}
export interface ApiResponseByID {
    success: boolean;
    message: string;
    data?: Book;
}

export interface ApiResponseDelete {
    success: boolean;
    message: string;
    data: {}
}