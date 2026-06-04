// Central API configuration for the frontend.
// Use REACT_APP_API_BASE_URL for deploy-time overrides if needed.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://dashboard-project-production-a896.up.railway.app";

const api = {
  baseUrl: API_BASE_URL,
  signup: `${API_BASE_URL}/signup`,
  buildUrl: (path) => `${API_BASE_URL}${path}`,
};

export default api;
