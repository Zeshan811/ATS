import api from './api';

export const authService = {
    register: (""),
    //register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data),
    uploadProfilePic: (formData) =>
        api.post('/auth/profile/picture', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }),
};