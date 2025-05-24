import { PaginatedResponse } from "../interfaces/paginatedResponse";

export function createPagination<T>(
    items: T[], 
    total: number, 
    page: number, 
    limit: number
): PaginatedResponse<T> { 
    return {
        items,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        },
    };
}