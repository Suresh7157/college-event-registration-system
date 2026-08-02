import axios from "axios";

const BASE_URL = "http://localhost:8080/api/admin";


// Users
export const getAllUsers = () => {
    return axios.get(`${BASE_URL}/users`);
};
export const getDashboard = () => {
    return axios.get(`${BASE_URL}/dashboard`);
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
export const getAdminProfile = (id) => {
    return axios.get(`${BASE_URL}/profile/${id}`);
};
export const approveVolunteer = (id) => {
    return axios.put(`${BASE_URL}/volunteers/${id}/approve`);
};

export const rejectVolunteer = (id) => {
    return axios.delete(`${BASE_URL}/volunteers/${id}`);
};



