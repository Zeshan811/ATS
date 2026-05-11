import api from './api';

export const authService = {
    // POST /api/auth/register  → { message }
    register: (data) => api.post('/auth/register', data),

    // POST /api/auth/login     → { token, role, name }
    login: (data) => api.post('/auth/login', data),
};