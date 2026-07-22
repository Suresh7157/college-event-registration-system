import api from "./api";

// Register User
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login User
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};