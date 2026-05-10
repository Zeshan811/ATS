import api from './api';

export const jobService = {
    // GET /api/jobs  → [...jobs]  (public)
    getAllJobs: (params) => api.get('/jobs', { params }),

    // GET /api/jobs/:id  — backend doesn't have this yet, so we fetch all and filter
    // We keep this for detail page; if backend adds it later it just works
    getJobById: (id) => api.get('/jobs').then((res) => {
        const jobs = Array.isArray(res.data) ? res.data : (res.data.jobs || []);
        const job = jobs.find((j) => j._id === id);
        if (!job) throw new Error('Job not found');
        return { data: { job } };
    }),

    // POST /api/jobs  (HR only)
    createJob: (data) => api.post('/jobs', data),

    // HR job list — same endpoint, returns all
    getHRJobs: () => api.get('/jobs').then((res) => {
        const jobs = Array.isArray(res.data) ? res.data : (res.data.jobs || []);
        return { data: { jobs } };
    }),
};