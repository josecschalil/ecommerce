// lib/auth.js
let refreshTimeout;

export async function refreshToken() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      console.log("Token refreshed successfully");

      // Schedule next refresh in ~4.5 minutes (if access = 5 min)
      scheduleRefresh(0.5 * 60 * 1000);

      return true;
    } else {
      console.warn("Refresh token expired or invalid");
      clearTimeout(refreshTimeout);
      return false;
    }
  } catch (err) {
    console.error("Refresh error:", err);
    clearTimeout(refreshTimeout);
    return false;
  }
}

export function scheduleRefresh(intervalMs) {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(refreshToken, intervalMs);
}
