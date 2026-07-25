import axios from "axios";

const API_URL = "http://localhost:8081/api/volunteers";

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

const volunteerService = {

    getAllVolunteers: () =>
        api.get(""),

    approveVolunteer: (id) =>
        api.put(`/${id}/approve`),

    rejectVolunteer: (id) =>
        api.put(`/${id}/reject`),

    updateVolunteer: (id, data) =>
        api.put(`/${id}`, data),

};

export default volunteerService;
