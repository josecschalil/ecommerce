export async function refreshToken() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      credentials: "include", // send cookie if it exists
      headers: { "Content-Type": "application/json" },
    });

    // ✅ If user has no cookie, do nothing (don’t throw error)
    if (response.status === 401) {
      console.log("No refresh token yet. Probably user not logged in.");
      return null;
    }

    if (!response.ok) {
      console.error("Failed to refresh token");
      return null;
    }

    const data = await response.json();
    console.log("Access token refreshed:", data.access);
    return data.access;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return null;
  }
}
