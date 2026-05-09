import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { jobService } from '../../services/jobService';
import { toast } from 'react-hot-toast';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Plus, Edit2, Trash2, MapPin, Briefcase, Users } from 'lucide-react';
import { BRANCHES, DEPARTMENTS, JOB_TYPES, formatDate } from '../../utils/helpers';

const defaultValues = { title: '', department: '', branch: '', type: 'Full-Time', seats: 1, description: '', requirements: '', responsibilities: '', deadline: '' };

const HRJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editJob, setEditJob] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [saving, setSaving] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

    const fetchJobs = () => {
        setLoading(true);
        jobService.getHRJobs()
            .then(({ data }) => setJobs(data.jobs || []))
            .catch(() => setJobs([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchJobs(); }, []);

    const openCreate = () => { setEditJob(null); reset(defaultValues); setModalOpen(true); };
    const openEdit = (job) => {
        setEditJob(job);
        reset({ ...job, deadline: job.deadline ? job.deadline.slice(0, 10) : '' });
        setModalOpen(true);
    };

    const onSubmit = async (data) => {
        setSaving(true);
        try {
            if (editJob) {
                await jobService.updateJob(editJob._id, data);
                toast.success('Job updated!');
            } else {
                await jobService.createJob(data);
                toast.success('Job posted!');
            }
            setModalOpen(false);
            fetchJobs();
        } catch {
            toast.error('Failed to save job');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await jobService.deleteJob(deleteId);
            toast.success('Job deleted');
            fetchJobs();
        } catch {
            toast.error('Failed to delete');
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

            {loading ? <LoadingSpinner /> : jobs.length === 0 ? (
                <EmptyState
                    icon={Briefcase}
                    title="No Jobs Posted"
                    description="Post your first job opening to start receiving applications"
                    action={<button onClick={openCreate} className="btn-primary"><Plus className="w-4 h-4" /> Post Job</button>}
                />
            ) : (
                <div className="space-y-3">
                    {jobs.map(job => (
                        <div key={job._id} className="card p-5 flex items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-slate-900">{job.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                    <span className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{job.branch}</span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.department}</span>
                                    <span className="badge bg-slate-100 text-slate-600">{job.type}</span>
                                    {job.seats && <span className="text-xs text-slate-500 flex items-center gap-1"><Users className="w-3 h-3" />{job.seats} seats</span>}
                                    {job.deadline && <span className="text-xs text-slate-500">Deadline: {formatDate(job.deadline)}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => openEdit(job)} className="btn-secondary py-2 px-3">
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => setDeleteId(job._id)} className="btn-danger py-2 px-3">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editJob ? 'Edit Job' : 'Post New Job'} size="lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            <label className="label">Job Title *</label>
                            <input className={`input-field ${errors.title ? 'border-red-300' : ''}`} placeholder="e.g. Senior React Developer"
                                {...register('title', { required: 'Title is required' })} />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>
                        <div>
                            <label className="label">Department *</label>
                            <select className={`input-field ${errors.department ? 'border-red-300' : ''}`}
                                {...register('department', { required: 'Department is required' })}>
                                <option value="">Select department</option>
                                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Branch *</label>
                            <select className={`input-field ${errors.branch ? 'border-red-300' : ''}`}
                                {...register('branch', { required: 'Branch is required' })}>
                                <option value="">Select branch</option>
                                {BRANCHES.map(b => <option key={b}>{b}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Job Type</label>
                            <select className="input-field" {...register('type')}>
                                {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Available Seats</label>
                            <input type="number" min="1" className="input-field" {...register('seats')} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="label">Application Deadline</label>
                            <input type="date" className="input-field" {...register('deadline')} />
                        </div>
                    </div>

                    <div>
                        <label className="label">Job Description *</label>
                        <textarea rows={4} className={`input-field resize-none ${errors.description ? 'border-red-300' : ''}`}
                            placeholder="Describe the role, company culture..."
                            {...register('description', { required: 'Description is required' })} />
                    </div>
                    <div>
                        <label className="label">Requirements</label>
                        <textarea rows={3} className="input-field resize-none" placeholder="Education, experience, skills required..."
                            {...register('requirements')} />
                    </div>
                    <div>
                        <label className="label">Responsibilities</label>
                        <textarea rows={3} className="input-field resize-none" placeholder="Day to day tasks and duties..."
                            {...register('responsibilities')} />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
                        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                            {saving ? 'Saving...' : editJob ? 'Update Job' : 'Post Job'}
                        </button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Job"
                message="Are you sure you want to delete this job? All associated applications will also be affected."
                confirmLabel="Delete"
                danger
            />
        </div>
    );
};

export default HRJobs;