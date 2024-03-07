import { MakeRequestOptions } from "@/types";
import { URL } from "@/utils/constants";

export const makeRequest = async <T>({ method, url, id, body, params, options = {} }: MakeRequestOptions): Promise<T> => {
    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
        throw new Error(`Invalid HTTP method: ${method}`);
    }

    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    const requestUrl = `${URL}/${url}${id ? `/${id}` : ''}${queryString}`;
    const headers = getHeaders(options.headers);

    try {
        const response = await fetch(requestUrl, {
            method,
            headers,
            body: ['POST', 'PUT'].includes(method) ? JSON.stringify(body) : undefined,
        });

        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

function getHeaders(customHeaders: Record<string, string> = {}): HeadersInit {
    return {
        'Content-Type': 'application/json',
        ...customHeaders,
    };
}

async function handleResponse(response: Response) {
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error as string || errorResponse.message as string || `Request failed with status ${response.status}`);
    }
    return response.json();
}

function handleError(error: unknown): Promise<never> {
    if (error instanceof Error) {
        return Promise.reject(error.message);
    }
    return Promise.reject("An unknown error occurred.");
}
