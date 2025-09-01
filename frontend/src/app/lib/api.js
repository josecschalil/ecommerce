import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // always include cookies
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // attempt refresh
        await api.post(
          "/token/refresh/",
          {},
          { withCredentials: true } // ✅ config, not body
        );

        // retry original request
        return api(error.config);
      } catch (refreshError) {
        console.error("Refresh failed, redirect to login");
        // Here you can clear state, redirect, etc.
      }
    }
    return Promise.reject(error);
  }
);

export default api;
