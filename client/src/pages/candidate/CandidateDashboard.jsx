import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationService } from '../../services/applicationService';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FileText, Briefcase, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { timeAgo } from '../../utils/helpers';

const CandidateDashboard = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        applicationService
            .getAllApplications()
            .then(({ data }) => setApplications(data.applications || []))
            .catch(() => setApplications([]))
            .finally(() => setLoading(false));
    }, []);

    const total = applications.length;
    // Match backend status enum casing
    const submitted = applications.filter((a) => a.status === 'Submitted').length;
    const shortlisted = applications.filter((a) => a.status === 'Shortlisted').length;
    const selected = applications.filter((a) => a.status === 'Selected').length;

    const stats = [
        { icon: FileText, label: 'Total Applied', value: total, color: 'text-blue-600', bg: 'bg-blue-100' },
        { icon: Clock, label: 'Under Review', value: submitted, color: 'text-amber-600', bg: 'bg-amber-100' },
        { icon: Briefcase, label: 'Shortlisted', value: shortlisted, color: 'text-purple-600', bg: 'bg-purple-100' },
        { icon: CheckCircle, label: 'Selected', value: selected, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    const recent = applications.slice(0, 5);

    return (
        <div className="animate-fade-in">
            {/* Welcome */}
            <div className="mb-6">
                <h1 className="page-title">Good day, {user?.name?.split(' ')[0]} 👋</h1>
                <p className="page-subtitle">Here's an overview of your job applications</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map(({ icon: Icon, label, value, color, bg }) => (
                    <div key={label} className="stat-card">
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">{value}</div>
                            <div className="text-xs text-slate-500">{label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Applications */}
                <div className="lg:col-span-2">
                    <div className="card">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="section-title">Recent Applications</h2>
                            <Link
                                to="/candidate/applications"
                                className="text-sm text-primary-600 font-semibold hover:underline flex items-center gap-1"
                            >
                                View all <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        {loading ? (
                            <LoadingSpinner />
                        ) : recent.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-slate-500 text-sm mb-3">No applications yet</p>
                                <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {recent.map((app) => (
                                    <div key={app._id} className="p-5 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="font-semibold text-slate-800 text-sm truncate">
                                                    {app.job?.title || 'Job'}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {app.job?.branch} · {timeAgo(app.createdAt)}
                                                </p>
                                            </div>
                                            <StatusBadge status={app.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <div className="card p-5">
                        <h2 className="section-title mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                to="/jobs"
                                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50 transition-all"
                            >
                                <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Briefcase className="w-4 h-4 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">Browse Jobs</p>
                                    <p className="text-xs text-slate-500">Find new opportunities</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;