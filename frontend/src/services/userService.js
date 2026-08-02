import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

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

const userService = {

    getProfile: () =>
        api.get("/me"),

};

export default userService;
