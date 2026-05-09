import {
    useState, useEffect
} from 'react';
import {
    Link
} from 'react-router-dom';
import {
    applicationService
} from '../../services/applicationService';
import {
    jobService
} from '../../services/jobService';
import {
    useAuth
} from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
    Briefcase, Users, Calendar, TrendingUp, ArrowRight, Clock
} from 'lucide-react';
import {
    timeAgo
} from '../../utils/helpers';

const HRDashboard = () => {
    const { user
    } = useAuth();
    const [stats, setStats
    ] = useState({
        jobs: 0, total: 0, shortlisted: 0, interviews: 0
    });
    const [recentApps, setRecentApps
    ] = useState([]);
    const [loading, setLoading
    ] = useState(true);

    useEffect(() => {
        Promise.all([
            applicationService.getAllApplications({
                limit: 5
            }),
            jobService.getHRJobs(),
        ]).then(([appsRes, jobsRes
        ]) => {
            const apps = appsRes.data.applications || [];
            setRecentApps(apps.slice(0,
                5));
            setStats({
                jobs: jobsRes.data.jobs?.length || 0,
                total: appsRes.data.total || apps.length,
                shortlisted: apps.filter(a => a.status === 'shortlisted').length,
                interviews: apps.filter(a => a.status === 'interview_scheduled').length,
            });
        }).catch(() => { }).finally(() => setLoading(false));
    },
        []);

    const statCards = [
        {
            icon: Briefcase, label: 'Active Jobs', value: stats.jobs, color: 'text-blue-600', bg: 'bg-blue-100', to: '/hr/jobs'
        },
        {
            icon: Users, label: 'Total Applicants', value: stats.total, color: 'text-purple-600', bg: 'bg-purple-100', to: '/hr/applicants'
        },
        {
            icon: TrendingUp, label: 'Shortlisted', value: stats.shortlisted, color: 'text-amber-600', bg: 'bg-amber-100', to: '/hr/applicants'
        },
        {
            icon: Calendar, label: 'Interviews', value: stats.interviews, color: 'text-green-600', bg: 'bg-green-100', to: '/hr/interviews'
        },
    ];

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="page-title">HR Dashboard</h1>
                <p className="page-subtitle">Welcome back,
                    {user?.name?.split(' ')[
                        0
                    ]
                    }. Here's your hiring overview.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statCards.map(({ icon: Icon, label, value, color, bg, to
                }) => (
                    <Link key={label
                    } to={to
                    } className="stat-card hover:shadow-md transition-all group">
                        <div className={`w-10 h-10 rounded-xl ${bg
                            } flex items-center justify-center flex-shrink-0`
                        }>
                            <Icon className={`w-5 h-5 ${color
                                }`
                            } />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{value
                            }</div>
                            <div className="text-xs text-slate-400">{label
                            }</div>
                        </div>
                    </Link>
                ))
                }
            </div>

            <div className="card overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="section-title">Recent Applications</h2>
                    <Link to="/hr/applicants" className="text-sm text-primary-600 font-semibold flex items-center gap-1 hover:underline">
                        View all <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
                {loading ? <LoadingSpinner /> : recentApps.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">No applications yet</div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {recentApps.map(app => (
                            <div key={app._id
                            } className="px-6 py-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-slate-800 text-sm truncate">{app.candidate?.name
                                            }</p>
                                        </div>
                                        <p className="text-xs text-slate-500 truncate">{app.job?.title
                                        } · <span className="flex items-center inline-flex gap-1"><Clock className="w-3 h-3 inline" />{timeAgo(app.createdAt)
                                        }</span></p>
                                    </div>
                                    <StatusBadge status={app.status
                                    } />
                                </div>
                            </div>
                        ))
                        }
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default HRDashboard;