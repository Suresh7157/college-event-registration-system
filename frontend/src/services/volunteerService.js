import api from "./api";

export const getAllVolunteers = () => {
    return api.get("/volunteers");
};

export const getVolunteerById = (id) => {
    return api.get(`/volunteers/${id}`);
};

export const applyVolunteer = (volunteer) => {
    return api.post("/volunteers", volunteer);
};

export const updateVolunteer = (id, volunteer) => {
    return api.put(`/volunteers/${id}`, volunteer);
};

export const deleteVolunteer = (id) => {
    return api.delete(`/volunteers/${id}`);
};