import axios from "axios";

const API_URL = "http://localhost:8081/api/events";

const eventService = {

    getAllEvents: (page = 0, size = 10, sortBy = "eventDate", direction = "asc") =>
        axios.get(API_URL, {
            params: {
                page,
                size,
                sortBy,
                direction
            }
        }),

    getEventById: (id) =>
        axios.get(`${API_URL}/${id}`),

    createEvent: (eventData) =>
        axios.post(API_URL, eventData),

    updateEvent: (id, eventData) =>
        axios.put(`${API_URL}/${id}`, eventData),

    deleteEvent: (id) =>
        axios.delete(`${API_URL}/${id}`),

    searchEvents: (title) =>
        axios.get(`${API_URL}/search`, {
            params: { title }
        })

};

export default eventService;