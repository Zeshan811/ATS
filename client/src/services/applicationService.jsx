import api from './api';

export const applicationService = {
    // Candidate
    apply: (formData) =>
        api.post('/applications', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    getMyApplications: () => api.get('/applications/my'),
    getApplicationById: (id) => api.get(`/applications/${id}`),

    // HR/Admin
    getAllApplications: (params) => api.get('/applications/hr/all', { params }),
    getApplicationsByJob: (jobId) => api.get(`/applications/hr/job/${jobId}`),
    updateStatus: (id, data) => api.put(`/applications/${id}/status`, data),
    scheduleInterview: (id, data) => api.post(`/applications/${id}/interview`, data),
    sendEmail: (id, data) => api.post(`/applications/${id}/email`, data),
};