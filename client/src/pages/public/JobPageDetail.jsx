import {
    useState, useEffect
} from 'react';
import {
    useParams, Link, useNavigate
} from 'react-router-dom';
import {
    jobService
} from '../../services/jobService';
import {
    useAuth
} from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
    MapPin, Briefcase, Users, Clock, ArrowLeft, Send
} from 'lucide-react';
import {
    formatDate, timeAgo
} from '../../utils/helpers';

const JobDetailPage = () => {
    const { id
    } = useParams();
    const { isAuthenticated, user
    } = useAuth();
    const navigate = useNavigate();
    const [job, setJob
    ] = useState(null);
    const [loading, setLoading
    ] = useState(true);

    useEffect(() => {
        jobService.getJobById(id)
            .then(({ data
            }) => setJob(data.job))
            .catch(() => navigate('/jobs'))
            .finally(() => setLoading(false));
    },
        [id
        ]);

    if (loading) return <LoadingSpinner fullScreen />;
    if (!job) return null;

    const handleApply = () => {
        if (!isAuthenticated) return navigate('/login');
        navigate(`/candidate/apply/${id
            }`);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <Link to="/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Jobs
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                { /* Main */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                                <Briefcase className="w-7 h-7 text-primary-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-display font-bold text-slate-900">{job.title
                                }</h1>
                                <p className="text-slate-500 mt-0.5">{job.department
                                }</p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className="badge bg-primary-100 text-primary-700">{job.type
                                    }</span>
                                    <span className="badge bg-slate-100 text-slate-600 gap-1">
                                        <MapPin className="w-3 h-3" />{job.branch
                                        }
                                    </span>
                                    {job.seats && <span className="badge bg-green-100 text-green-700">{job.seats
                                    } seats available</span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none">
                            <h3 className="text-slate-900 font-bold mb-3">Job Description</h3>
                            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{job.description
                            }</p>

                            {job.requirements && (
                                <>
                                    <h3 className="text-slate-900 font-bold mt-6 mb-3">Requirements</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{job.requirements
                                    }</p>
                                </>
                            )
                            }

                            {job.responsibilities && (
                                <>
                                    <h3 className="text-slate-900 font-bold mt-6 mb-3">Responsibilities</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{job.responsibilities
                                    }</p>
                                </>
                            )
                            }
                        </div>
                    </div>
                </div>

                { /* Sidebar */}
                <div className="space-y-4">
                    <div className="card p-5 sticky top-6">
                        <h3 className="font-bold text-slate-900 mb-4">Job Details</h3>
                        <dl className="space-y-3">
                            {
                                [
                                    {
                                        icon: MapPin, label: 'Branch', value: job.branch
                                    },
                                    {
                                        icon: Briefcase, label: 'Department', value: job.department
                                    },
                                    {
                                        icon: Briefcase, label: 'Type', value: job.type
                                    },
                                    {
                                        icon: Users, label: 'Seats', value: job.seats || 'Not specified'
                                    },
                                    {
                                        icon: Clock, label: 'Posted', value: timeAgo(job.createdAt)
                                    },
                                    {
                                        icon: Clock, label: 'Deadline', value: job.deadline ? formatDate(job.deadline) : 'Open'
                                    },
                                ].map(({ icon: Icon, label, value
                                }) => (
                                    <div key={label
                                    } className="flex items-center justify-between text-sm">
                                        <dt className="text-slate-500 flex items-center gap-1.5"><Icon className="w-3.5 h-3.5" />{label
                                        }</dt>
                                        <dd className="font-semibold text-slate-700">{value
                                        }</dd>
                                    </div>
                                ))
                            }
                        </dl>

                        <div className="mt-6 space-y-3">
                            {user?.role !== 'hr' && user?.role !== 'admin' && (
                                <button onClick={handleApply
                                } className="btn-primary w-full justify-center">
                                    <Send className="w-4 h-4" /> Apply Now
                                </button>
                            )
                            }
                            {!isAuthenticated && (
                                <p className="text-xs text-slate-500 text-center">
                                    <Link to="/login" className="text-primary-600 font-semibold">Sign in</Link> to apply
                                </p>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;