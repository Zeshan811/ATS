import api from './api';

export const branchService = {
    getAllBranches: () => api.get('/branches'),
    getBranchById: (id) => api.get(`/branches/${id}`),
    createBranch: (data) => api.post('/branches', data),
    updateBranch: (id, data) => api.put(`/branches/${id}`, data),
    deleteBranch: (id) => api.delete(`/branches/${id}`),
};