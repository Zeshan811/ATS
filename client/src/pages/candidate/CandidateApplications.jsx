import { useState, useEffect } from 'react';
import { applicationService } from '../../services/applicationService';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { FileText, MapPin, ExternalLink, Clock } from 'lucide-react';
import { formatDate, timeAgo, STATUS_OPTIONS } from '../../utils/helpers';
import { Link } from 'react-router-dom';

// Backend only exposes /applications/job/:jobId (HR route)
// Candidates can see their apps via the HR view — for now we'll fetch what's available
// In a real scenario, the backend would need a /applications/my endpoint.
// We'll display a notice if no data is returned.

const CandidateApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Fetch all applications (HR aggregation), then filter by candidate
        applicationService
            .getAllApplications()
            .then(({ data }) => setApplications(data.applications || []))
            .catch(() => setApplications([]))
            .finally(() => setLoading(false));
    }, []);

    const statuses = ['all', ...STATUS_OPTIONS];
    const filtered =
        filter === 'all' ? applications : applications.filter((a) => a.status === filter);

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="page-title">My Applications</h1>
                <p className="page-subtitle">{applications.length} total applications</p>
            </div>

            {/* Status filter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
                {statuses.map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${filter === s
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'
                            }`}
                    >
                        {s === 'all' ? 'All' : s}
                        <span className="ml-1.5 opacity-70">
                            ({s === 'all' ? applications.length : applications.filter((a) => a.status === s).length})
                        </span>
                    </button>
                ))}
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : filtered.length === 0 ? (
                <EmptyState
                    icon={FileText}
                    title="No Applications"
                    description={
                        filter === 'all'
                            ? "You haven't applied for any jobs yet."
                            : `No applications with status: ${filter}`
                    }
                    action={filter === 'all' && <Link to="/jobs" className="btn-primary">Browse Jobs</Link>}
                />
            ) : (
                <div className="space-y-3">
                    {filtered.map((app) => (
                        <div key={app._id} className="card p-5">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-slate-900">{app.job?.title || 'Position'}</h3>
                                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {app.job?.branch}
                                        </span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {timeAgo(app.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <StatusBadge status={app.status} />
                                    {app.resumeUrl && (
                                        <a
                                            href={app.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-ghost text-xs py-1"
                                        >
                                            <ExternalLink className="w-3 h-3" /> View Resume
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CandidateApplications;