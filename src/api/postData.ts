import { baseUrl } from "../constant/baseUrl";
import type { ApiResponse } from "../types/types";

export const postData = async <T>(
  url: string,
  method: string,
  body?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const isFormData = body instanceof FormData;

    const response = await fetch(`${baseUrl}/api/dashboard/${url}`, {
      method,
      headers: {
        ...(isFormData
          ? {
              "Authorization": "Bearer 14|5Iiqm1DozSibgnjOqCTaXFaMXzj5H8ghCkLJVNRd0cd71dd1",
               'Content-Type': 'application/x-www-form-urlencoded'
            }
          : {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Authorization": "Bearer 14|5Iiqm1DozSibgnjOqCTaXFaMXzj5H8ghCkLJVNRd0cd71dd1",
            }),
        ...(options?.headers || {}),
      },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      credentials: "include",
      ...options,
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        typeof result?.message === "string"
          ? result.message
          : result?.errors?.join?.(", ") || "Request failed";
      return { status: response.status, error: errorMessage };
    }

    return { status: response.status, data: result };
  } catch (error: unknown) {
    return {
      status: 0,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
};


