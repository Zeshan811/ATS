import {
    useState, useEffect
} from 'react';
import {
    applicationService
} from '../../services/applicationService';
import {
    toast
} from 'react-hot-toast';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import {
    Calendar, User
} from 'lucide-react';

const HRInterviews = () => {
    const [applications, setApplications
    ] = useState([]);
    const [loading, setLoading
    ] = useState(true);

    useEffect(() => {
        applicationService
            .getAllApplications()
            .then(({ data
            }) => setApplications(data.applications || []))
            .catch(() => setApplications([]))
            .finally(() => setLoading(false));
    },
        []);

    // Match backend enum exactly
    const shortlisted = applications.filter((a) => a.status === 'Shortlisted');
    const scheduled = applications.filter((a) => a.status === 'Interview Scheduled');

    const scheduleInterview = async (app) => {
        try {
            await applicationService.updateStatus(app._id,
                {
                    status: 'Interview Scheduled'
                });
            setApplications((prev) =>
                prev.map((a) => (a._id === app._id ? {
                    ...a, status: 'Interview Scheduled'
                } : a))
            );
            toast.success(`Interview scheduled for ${app.candidate?.name
                }`);
        } catch {
            toast.error('Failed to schedule interview');
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="page-title">Interview Management</h1>
                <p className="page-subtitle">Schedule and track candidate interviews</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                { /* Shortlisted — ready to schedule */}
                <div className="card overflow-hidden">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="section-title">Ready to Schedule ({shortlisted.length
                        })</h2>
                    </div>
                    {loading ? (
                        <LoadingSpinner />
                    ) : shortlisted.length === 0 ? (
                        <EmptyState
                            icon={User
                            }
                            title="No Shortlisted Candidates"
                            description="Shortlist applicants from the Applicants page to schedule interviews"
                        />
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {shortlisted.map((app) => (
                                <div key={app._id
                                } className="p-5 flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-800 text-sm">{app.candidate?.name
                                        }</p>
                                        <p className="text-xs text-slate-500">
                                            {app.job?.title
                                            } · {app.job?.branch
                                            }
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => scheduleInterview(app)
                                        }
                                        className="btn-primary py-2 px-3 text-xs whitespace-nowrap"
                                    >
                                        <Calendar className="w-3 h-3" /> Schedule
                                    </button>
                                </div>
                            ))
                            }
                        </div>
                    )
                    }
                </div>

                { /* Scheduled interviews */}
                <div className="card overflow-hidden">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="section-title">Scheduled Interviews ({scheduled.length
                        })</h2>
                    </div>
                    {loading ? (
                        <LoadingSpinner />
                    ) : scheduled.length === 0 ? (
                        <EmptyState
                            icon={Calendar
                            }
                            title="No Scheduled Interviews"
                            description="Interviews you schedule will appear here"
                        />
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {scheduled.map((app) => (
                                <div key={app._id
                                } className="p-5">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="font-semibold text-slate-800 text-sm">{app.candidate?.name
                                            }</p>
                                            <p className="text-xs text-slate-500">{app.job?.title
                                            }</p>
                                        </div>
                                        <span className="badge bg-indigo-100 text-indigo-700 whitespace-nowrap">
                                            Scheduled
                                        </span>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default HRInterviews;