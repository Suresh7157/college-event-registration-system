import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= Event APIs =================

export const getEvents = () => {
  return API.get("/events");
};

// ================= Registration APIs =================

export const registerStudent = (registrationData) => {
  return API.post("/registrations", registrationData);
};

export const getRegistrations = () => {
  return API.get("/registrations");
};

export const getRegistration = (id) => {
  return API.get(`/registrations/${id}`);
};

export const deleteRegistration = (id) => {
  return API.delete(`/registrations/${id}`);
};

export const getRegistrationStatus = () => {
  return API.get("/registrations/status");
};

// ================= Default Export =================

const registrationService = {
  getEvents,
  registerStudent,
  getRegistrations,
  getRegistration,
  deleteRegistration,
  getRegistrationStatus,
};

export default registrationService;