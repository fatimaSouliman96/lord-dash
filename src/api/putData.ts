import { baseUrl } from "../constant/baseUrl";
import type { ApiResponse } from "../types/types";

export const putData = async <T>(
  url: string,
  body: unknown,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(baseUrl + "/api/dashboard/" + url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
        ...(options?.headers || {}),
      },
      body: JSON.stringify(body),
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


