import { refreshToken } from "./auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function apiFetch(url, options = {}, retry = true) {
  try {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: options.method || "GET",
      credentials: "include",
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
      },
      body: options.body
        ? isFormData
          ? options.body
          : JSON.stringify(options.body)
        : undefined,
    });

    if (response.ok) {
      // Safely parse JSON if present
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    }

    if (response.status === 401 && retry) {
      const refreshed = await refreshToken();
      if (refreshed) {
        return apiFetch(url, options, false); // retry once only
      }
      throw new Error("Unauthorized and refresh failed");
    }

    throw new Error(`Request failed with status ${response.status}`);
  } catch (err) {
    console.error("apiFetch error:", err);
    throw err;
  }
}
