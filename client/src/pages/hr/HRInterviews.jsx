import { useState, useEffect } from 'react';
import { applicationService } from '../../services/applicationService';
import { toast } from 'react-hot-toast';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Calendar, Plus, Clock, User, MapPin } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const HRInterviews = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scheduleModal, setScheduleModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [form, setForm] = useState({ date: '', time: '', location: '', message: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        applicationService.getAllApplications({ status: 'shortlisted' })
            .then(({ data }) => setApplications(data.applications || []))
            .catch(() => setApplications([]))
            .finally(() => setLoading(false));
    }, []);

    const scheduled = applications.filter(a => a.status === 'interview_scheduled');
    const shortlisted = applications.filter(a => a.status === 'shortlisted');

    const openSchedule = (app) => {
        setSelectedApp(app);
        setForm({ date: '', time: '', location: '', message: '' });
        setScheduleModal(true);
    };

    const handleSchedule = async () => {
        if (!form.date || !form.time) { toast.error('Date and time are required'); return; }
        setSaving(true);
        try {
            await applicationService.scheduleInterview(selectedApp._id, form);
            toast.success('Interview scheduled & email sent!');
            setScheduleModal(false);
            setApplications(prev => prev.map(a =>
                a._id === selectedApp._id ? { ...a, status: 'interview_scheduled', interview: form } : a
            ));
        } catch {
            toast.error('Failed to schedule interview');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="page-title">Interview Management</h1>
                <p className="page-subtitle">Schedule and track candidate interviews</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Shortlisted - ready to schedule */}
                <div className="card overflow-hidden">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="section-title">Ready to Schedule ({shortlisted.length})</h2>
                    </div>
                    {loading ? <LoadingSpinner /> : shortlisted.length === 0 ? (
                        <EmptyState icon={User} title="No Shortlisted Candidates" description="Shortlist applicants from the Applicants page to schedule interviews" />
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {shortlisted.map(app => (
                                <div key={app._id} className="p-5 flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-800 text-sm">{app.candidate?.name}</p>
                                        <p className="text-xs text-slate-500">{app.job?.title} · {app.job?.branch}</p>
                                    </div>
                                    <button onClick={() => openSchedule(app)} className="btn-primary py-2 px-3 text-xs whitespace-nowrap">
                                        <Plus className="w-3 h-3" /> Schedule
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Scheduled interviews */}
                <div className="card overflow-hidden">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="section-title">Scheduled Interviews ({scheduled.length})</h2>
                    </div>
                    {loading ? <LoadingSpinner /> : scheduled.length === 0 ? (
                        <EmptyState icon={Calendar} title="No Scheduled Interviews" description="Interviews you schedule will appear here" />
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {scheduled.map(app => (
                                <div key={app._id} className="p-5">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div>
                                            <p className="font-semibold text-slate-800 text-sm">{app.candidate?.name}</p>
                                            <p className="text-xs text-slate-500">{app.job?.title}</p>
                                        </div>
                                        <span className="badge bg-indigo-100 text-indigo-700 whitespace-nowrap">Scheduled</span>
                                    </div>
                                    {app.interview && (
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />{formatDate(app.interview.date)}
                                            </span>
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />{app.interview.time}
                                            </span>
                                            {app.interview.location && (
                                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />{app.interview.location}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Schedule Modal */}
            <Modal isOpen={scheduleModal} onClose={() => setScheduleModal(false)} title="Schedule Interview" size="md">
                <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-sm font-semibold text-slate-800">{selectedApp?.candidate?.name}</p>
                        <p className="text-xs text-slate-500">{selectedApp?.job?.title} · {selectedApp?.candidate?.email}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">Date *</label>
                            <input type="date" className="input-field" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
                        </div>
                        <div>
                            <label className="label">Time *</label>
                            <input type="time" className="input-field" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} />
                        </div>
                    </div>

                    <div>
                        <label className="label">Location / Meeting Link</label>
                        <input className="input-field" placeholder="e.g. Office Room 3 or Zoom link" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
                    </div>

                    <div>
                        <label className="label">Message to Candidate</label>
                        <textarea rows={4} className="input-field resize-none" placeholder="Add any special instructions or preparation notes..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button onClick={() => setScheduleModal(false)} className="btn-secondary">Cancel</button>
                        <button onClick={handleSchedule} disabled={saving} className="btn-primary disabled:opacity-60">
                            {saving ? 'Scheduling...' : <><Calendar className="w-4 h-4" /> Schedule & Notify</>}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default HRInterviews;