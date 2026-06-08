// API Service
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  signup: (data) => api.post("/auth/signup", data),
  studentLogin: (data) => api.post("/auth/student-login", data),
  adminLogin: (data) => api.post("/auth/admin-login", data),
};

// Gate Pass API calls
export const gatePassAPI = {
  createGatePass: (data) => api.post("/gate-pass", data),
  getStudentPasses: () => api.get("/gate-pass/my-passes"),
  getAllPasses: () => api.get("/gate-pass"),
  getPassById: (id) => api.get(`/gate-pass/${id}`),
  updatePass: (id, data) => api.put(`/gate-pass/${id}`, data),
  deletePass: (id) => api.delete(`/gate-pass/${id}`),
  approvePass: (id) => api.put(`/gate-pass/${id}/approve`),
  rejectPass: (id, data) => api.put(`/gate-pass/${id}/reject`, data),
  getDashboardStats: () => api.get("/gate-pass/admin/stats"),
  getStudentStats: () => api.get("/gate-pass/stats/student"),
};

export default api;
