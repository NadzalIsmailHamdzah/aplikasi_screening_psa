import apiClient from './api.js';

export const getApplicants = async () => {
    const response = await apiClient.get('/applicants');
    return response.data;
};

export const getApplicantById = async (id) => {
    const response = await apiClient.get(`/applicants/${id}`);
    return response.data;
};

export const createApplicant = async (formData) => {
    const response = await apiClient.post('/applicants', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteApplicant = async (id) => {
    const response = await apiClient.delete(`/applicants/${id}`);
    return response.data;
};