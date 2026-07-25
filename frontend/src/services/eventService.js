import axios from "axios";

const API_URL = "http://localhost:8081/api/events";

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

const eventService = {

    getAllEvents: (page = 0, size = 10, sortBy = "eventDate", direction = "asc") =>
        api.get("", {
            params: {
                page,
                size,
                sortBy,
                direction
            }
        }),

    getEventsByStatus: (status) =>
    api.get("/status", {
        params: { status }
    }),

    getEventById: (id) =>
        api.get(`/${id}`),

    createEvent: (formData) =>
        api.post("", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }),

    updateEvent: (id, eventData) =>
        api.put(`/${id}`, eventData),

    deleteEvent: (id) =>
        api.delete(`/${id}`),

    searchEvents: (title) =>
        api.get("/search", {
            params: { title }
        })

    

};

export default eventService;