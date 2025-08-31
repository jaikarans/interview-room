import axios from "axios";

// Base URL of your Spring Boot backend
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8443", 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default api;
