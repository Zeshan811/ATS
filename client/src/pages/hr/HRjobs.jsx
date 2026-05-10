import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { jobService } from '../../services/jobService';
import { toast } from 'react-hot-toast';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Plus, MapPin, Briefcase, Users } from 'lucide-react';
import { BRANCHES, DEPARTMENTS, formatDate } from '../../utils/helpers';
// Backend Job model: { title, description, department, branch, availableSeats }
const defaultValues = {
    title: '',
    department: '',
    branch: '',
    availableSeats: 1,
    description: '',
};

const HRJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

    const fetchJobs = () => {
        setLoading(true);
        jobService
            .getHRJobs()
            .then(({ data }) => setJobs(data.jobs || []))
            .catch(() => setJobs([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const openCreate = () => {
        reset(defaultValues);
        setModalOpen(true);
    };

    const onSubmit = async (data) => {
        setSaving(true);
        try {
            // POST /api/jobs — backend only supports create (no update/delete endpoints yet)
            await jobService.createJob(data);
            toast.success('Job posted!');
            setModalOpen(false);
            fetchJobs();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to post job');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="page-title">Job Management</h1>
                    <p className="page-subtitle">{jobs.length} jobs posted</p>
                </div>
                <button onClick={openCreate} className="btn-primary">
                    <Plus className="w-4 h-4" /> Post Job
                </button>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : jobs.length === 0 ? (
                <EmptyState
                    icon={Briefcase}
                    title="No Jobs Posted"
                    description="Post your first job opening to start receiving applications"
                    action={
                        <button onClick={openCreate} className="btn-primary">
                            <Plus className="w-4 h-4" /> Post Job
                        </button>
                    }
                />
            ) : (
                <div className="space-y-3">
                    {jobs.map((job) => (
                        <div key={job._id} className="card p-5 flex items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-slate-900">{job.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {job.branch}
                                    </span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <Briefcase className="w-3 h-3" />
                                        {job.department}
                                    </span>
                                    {job.availableSeats && (
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {job.availableSeats} seats
                                        </span>
                                    )}
                                    <span className="text-xs text-slate-400">{formatDate(job.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Post New Job"
                size="lg"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="label">Job Title *</label>
                        <input
                            className={`input-field ${errors.title ? 'border-red-300' : ''}`}
                            placeholder="e.g. Senior React Developer"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Department *</label>
                            <select
                                className={`input-field ${errors.department ? 'border-red-300' : ''}`}
                                {...register('department', { required: 'Department is required' })}
                            >
                                <option value="">Select department</option>
                                {DEPARTMENTS.map((d) => (
                                    <option key={d}>{d}</option>
                                ))}
                            </select>
                            {errors.department && (
                                <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="label">Branch *</label>
                            <select
                                className={`input-field ${errors.branch ? 'border-red-300' : ''}`}
                                {...register('branch', { required: 'Branch is required' })}
                            >
                                <option value="">Select branch</option>
                                {BRANCHES.map((b) => (
                                    <option key={b}>{b}</option>
                                ))}
                            </select>
                            {errors.branch && (
                                <p className="text-red-500 text-xs mt-1">{errors.branch.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="label">Available Seats *</label>
                        <input
                            type="number"
                            min="1"
                            className="input-field"
                            {...register('availableSeats', { required: true, min: 1 })}
                        />
                    </div>

                    <div>
                        <label className="label">Job Description *</label>
                        <textarea
                            rows={5}
                            className={`input-field resize-none ${errors.description ? 'border-red-300' : ''}`}
                            placeholder="Describe the role, responsibilities, requirements..."
                            {...register('description', { required: 'Description is required' })}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                            {saving ? 'Posting...' : 'Post Job'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default HRJobs;