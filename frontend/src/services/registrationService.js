import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getAvailableEvents = () => {
    return axios.get(`${API_BASE_URL}/events`);
};

export const registerForEvent = (eventId) => {
    return axios.post(`${API_BASE_URL}/registrations/${eventId}`);
};

export const getMyRegistrations = () => {
    return axios.get(`${API_BASE_URL}/registrations`);
};

export const cancelRegistration = (registrationId) => {
    return axios.delete(
        `${API_BASE_URL}/registrations/${registrationId}`
    );
};

export const getRegistrationStatus = () => {
    return axios.get(`${API_BASE_URL}/registrations/status`);
};import axios from "axios";

const API = "http://localhost:8080/api";

export const getEvents = () => {
    return axios.get(`${API}/events`);
};

export const registerStudent = (registrationData) => {
    return axios.post(`${API}/registrations`, registrationData);
};

export const getRegistrations = () => {
    return axios.get(`${API}/registrations`);
};

export const getRegistration = (id) => {
    return axios.get(`${API}/registrations/${id}`);
};

export const deleteRegistration = (id) => {
    return axios.delete(`${API}/registrations/${id}`);
};