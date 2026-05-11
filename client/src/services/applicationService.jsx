import api from './api';

export const applicationService = {
    // POST /api/applications/:jobId  (Candidate only, multipart)
    apply: (jobId, formData) =>
        api.post(`/applications/${jobId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

    // GET /api/applications/job/:jobId  (HR only)
    getApplicationsByJob: (jobId) => api.get(`/applications/job/${jobId}`),

    // GET all applications for HR — backend: GET /api/applications/job/:jobId per job
    // We expose a helper that fetches all jobs then all apps
    getAllApplications: async (params) => {
        // Fetch all jobs first, then fetch applications for each
        const jobsRes = await api.get('/jobs');
        const jobs = Array.isArray(jobsRes.data) ? jobsRes.data : (jobsRes.data.jobs || []);
        const appArrays = await Promise.all(
            jobs.map((j) =>
                api.get(`/applications/job/${j._id}`).then((r) => {
                    // Attach job info to each application
                    return (Array.isArray(r.data) ? r.data : []).map((a) => ({
                        ...a,
                        job: a.job || j,
                    }));
                }).catch(() => [])
            )
        );
        const applications = appArrays.flat();
        // Apply status filter if provided
        const filtered = params?.status
            ? applications.filter((a) => a.status === params.status)
            : applications;
        return { data: { applications: filtered, total: filtered.length } };
    },

    // PUT /api/applications/:id/status  (HR only)
    updateStatus: (id, data) => api.put(`/applications/${id}/status`, data),
};