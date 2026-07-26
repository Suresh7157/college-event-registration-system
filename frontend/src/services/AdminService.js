import axios from "axios";

const BASE_URL = "http://localhost:8080/api/admin";

// Users
export const getAllUsers = () => {
    return axios.get(`${BASE_URL}/users`);
};

// Events
export const getAllEvents = () => {
    return axios.get(`${BASE_URL}/events`);

};
export const getAllOrganizers = () => {
    return axios.get(`${BASE_URL}/organizers`);
};
export const getAllVolunteers = () => {
    return axios.get(`${BASE_URL}/volunteers`);
};