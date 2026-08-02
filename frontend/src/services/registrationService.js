import axios from "axios";

const API_URL = "http://localhost:8080/api/registrations";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const registrationService = {

    getAllRegistrations: () =>
        api.get(""),

    deleteRegistration: (registrationId) =>
        api.delete(`/${registrationId}`),

};

export default registrationService;
