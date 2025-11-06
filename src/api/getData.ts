import { baseUrl } from "../constant/baseUrl";
import type { ApiResponse } from "../types/types";


export const getData = async <T>(
  url: string
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(baseUrl + "/api/dashboard/" + url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      "Authorization": `Bearer 14|5Iiqm1DozSibgnjOqCTaXFaMXzj5H8ghCkLJVNRd0cd71dd1`
      },
      credentials: "include", // 👈 مهم لتمرير الكوكيز

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
      return {
        status: response.status,
        error: errorMessage,
      };
    }

    return { status: response.status, data: result };
  } catch (error: unknown) {
    return {
      status: 0,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
};