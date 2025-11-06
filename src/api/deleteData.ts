import { baseUrl } from "../constant/baseUrl";
import type { ApiResponse } from "../types/types";

export const deleteData = async <T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(baseUrl + "/api/dashboard/" + url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      credentials: "include", // 👈 مهم لتمرير الكوكيز
      ...options,
    });

    let result: any = {};
    try {
      result = await response.json();
    } catch { }

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


