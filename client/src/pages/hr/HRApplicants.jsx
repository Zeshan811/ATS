import { useState, useEffect } from 'react';
import { applicationService } from '../../services/applicationService';
import { toast } from 'react-hot-toast';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Users, ExternalLink, Mail, Search } from 'lucide-react';
import { timeAgo, STATUS_OPTIONS } from '../../utils/helpers';

const HRApplicants = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedApp, setSelectedApp] = useState(null);
    const [emailModal, setEmailModal] = useState(false);
    const [emailData, setEmailData] = useState({ subject: '', message: '' });
    const [sendingEmail, setSendingEmail] = useState(false);

    const fetchApplications = () => {
        setLoading(true);
        applicationService
            .getAllApplications()
            .then(({ data }) => setApplications(data.applications || []))
            .catch(() => setApplications([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = async (appId, newStatus) => {
        try {
            await applicationService.updateStatus(appId, { status: newStatus });
            setApplications((prev) =>
                prev.map((a) => (a._id === appId ? { ...a, status: newStatus } : a))
            );
            toast.success(`Status updated to "${newStatus}"`);
        } catch {
            toast.error('Failed to update status');
        }
    };

    const handleSendEmail = async () => {
        // Backend updateStatus accepts customMessage — we'll update status + send message
        setSendingEmail(true);
        try {
            await applicationService.updateStatus(selectedApp._id, {
                status: selectedApp.status,
                customMessage: `${emailData.subject}\n\n${emailData.message}`,
            });
            toast.success('Email sent successfully!');
            setEmailModal(false);
            setEmailData({ subject: '', message: '' });
        } catch {
            toast.error('Failed to send email');
        } finally {
            setSendingEmail(false);
        }
    };

    const filtered = applications.filter((a) => {
        const matchSearch =
            !search ||
            a.candidate?.name?.toLowerCase().includes(search.toLowerCase()) ||
            a.job?.title?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || a.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="page-title">Applicants</h1>
                <p className="page-subtitle">{applications.length} total applications</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        placeholder="Search by candidate or job..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-field pl-10"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="input-field sm:w-52"
                >
                    <option value="all">All Status</option>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : filtered.length === 0 ? (
                <EmptyState icon={Users} title="No Applicants Found" description="No applications match your filters" />
            ) : (
                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Candidate</th>
                                    <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5 hidden md:table-cell">
                                        Job Position
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Status</th>
                                    <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5 hidden lg:table-cell">
                                        Applied
                                    </th>
                                    <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3.5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filtered.map((app) => (
                                    <tr key={app._id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-5 py-4">
                                            <div>
                                                <p className="font-semibold text-slate-800 text-sm">
                                                    {app.candidate?.name || 'N/A'}
                                                </p>
                                                <p className="text-xs text-slate-500">{app.candidate?.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 hidden md:table-cell">
                                            <p className="text-sm text-slate-700">{app.job?.title}</p>
                                            <p className="text-xs text-slate-500">{app.job?.branch}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                                className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                            >
                                                {STATUS_OPTIONS.map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-5 py-4 hidden lg:table-cell">
                                            <span className="text-xs text-slate-500">{timeAgo(app.createdAt)}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {app.resumeUrl && (
                                                    <a
                                                        href={app.resumeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                                                        title="View Resume"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setSelectedApp(app);
                                                        setEmailModal(true);
                                                    }}
                                                    className="p-1.5 rounded-lg hover:bg-primary-50 text-slate-500 hover:text-primary-600 transition-colors"
                                                    title="Send Email / Update Status"
                                                >
                                                    <Mail className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Email / Status Modal */}
            <Modal
                isOpen={emailModal}
                onClose={() => setEmailModal(false)}
                title="Send Email to Candidate"
                size="md"
            >
                <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-sm font-semibold text-slate-800">{selectedApp?.candidate?.name}</p>
                        <p className="text-xs text-slate-500">{selectedApp?.candidate?.email}</p>
                    </div>

                    <div>
                        <label className="label">Quick Templates</label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                {
                                    label: 'Shortlist',
                                    subject: 'Application Shortlisted',
                                    message: `Dear ${selectedApp?.candidate?.name},\n\nCongratulations! Your application for ${selectedApp?.job?.title} has been shortlisted. We will be in touch soon.\n\nBest regards,\nHR Team`,
                                },
                                {
                                    label: 'Reject',
                                    subject: 'Application Status Update',
                                    message: `Dear ${selectedApp?.candidate?.name},\n\nThank you for your interest in ${selectedApp?.job?.title}. After careful consideration, we regret to inform you that we won't be moving forward with your application.\n\nBest regards,\nHR Team`,
                                },
                            ].map((t) => (
                                <button
                                    key={t.label}
                                    onClick={() => setEmailData({ subject: t.subject, message: t.message })}
                                    className="badge bg-slate-100 text-slate-600 cursor-pointer hover:bg-primary-100 hover:text-primary-700 transition-colors"
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="label">Subject</label>
                        <input
                            className="input-field"
                            value={emailData.subject}
                            onChange={(e) => setEmailData((p) => ({ ...p, subject: e.target.value }))}
                            placeholder="Email subject"
                        />
                    </div>
                    <div>
                        <label className="label">Message</label>
                        <textarea
                            rows={6}
                            className="input-field resize-none"
                            value={emailData.message}
                            onChange={(e) => setEmailData((p) => ({ ...p, message: e.target.value }))}
                            placeholder="Type your message..."
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button onClick={() => setEmailModal(false)} className="btn-secondary">
                            Cancel
                        </button>
                        <button
                            onClick={handleSendEmail}
                            disabled={sendingEmail || !emailData.subject || !emailData.message}
                            className="btn-primary disabled:opacity-60"
                        >
                            {sendingEmail ? 'Sending...' : <><Mail className="w-4 h-4" /> Send Email</>}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default HRApplicants;