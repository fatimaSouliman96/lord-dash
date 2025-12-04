import { baseUrl } from "../constant/baseUrl";
import type { ApiResponse } from "../types/types";
import Cookies from "js-cookie";
export const fetchFunc = async <T>(
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
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `${Cookies.get("token") ? `Bearer ${Cookies.get("token")}` : ""}`,
      },
      ...(options?.headers || {}),
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
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


