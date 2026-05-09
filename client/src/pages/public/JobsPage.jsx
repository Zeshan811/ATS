import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/common/Pagination';
import { Search, MapPin, Briefcase, Clock, ChevronRight, Filter, X } from 'lucide-react';
import { BRANCHES, DEPARTMENTS, JOB_TYPES, timeAgo } from '../../utils/helpers';

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({ search: '', branch: '', department: '', type: '' });
    const [showFilters, setShowFilters] = useState(false);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const { data } = await jobService.getAllJobs({ ...filters, page, limit: 10 });
            setJobs(data.jobs || []);
            setTotalPages(data.totalPages || 1);
        } catch {
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchJobs(); }, [page, filters]);
    // useEffect(() => {
    //     const fetchJobs = async () => {
    //         setLoading(true);

    //         try {
    //             const { data } = await jobService.getAllJobs({
    //                 ...filters,
    //                 page,
    //                 limit: 10
    //             });

    //             setJobs(data.jobs || []);
    //             setTotalPages(data.totalPages || 1);
    //         } catch (error) {
    //             alert(error);
    //             setJobs([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchJobs();
    // }, [page, filters]);

    const handleFilterChange = (key, val) => {
        setFilters(prev => ({ ...prev, [key]: val }));
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ search: '', branch: '', department: '', type: '' });
        setPage(1);
    };

    const hasFilters = Object.values(filters).some(Boolean);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Browse Jobs</h1>
                <p className="text-slate-500">Find your next opportunity across our branches</p>
            </div>

            {/* Search */}
            <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search jobs, skills, titles..."
                        value={filters.search}
                        onChange={e => handleFilterChange('search', e.target.value)}
                        className="input-field pl-10"
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`btn-secondary gap-2 ${showFilters ? 'border-primary-300 text-primary-600' : ''}`}
                >
                    <Filter className="w-4 h-4" /> Filters
                </button>
                {hasFilters && (
                    <button onClick={clearFilters} className="btn-ghost text-red-500 hover:bg-red-50">
                        <X className="w-4 h-4" /> Clear
                    </button>
                )}
            </div>

            {/* Filters */}
            {showFilters && (
                <div className="card p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up">
                    <div>
                        <label className="label">Branch</label>
                        <select className="input-field" value={filters.branch} onChange={e => handleFilterChange('branch', e.target.value)}>
                            <option value="">All Branches</option>
                            {BRANCHES.map(b => <option key={b}>{b}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Department</label>
                        <select className="input-field" value={filters.department} onChange={e => handleFilterChange('department', e.target.value)}>
                            <option value="">All Departments</option>
                            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Job Type</label>
                        <select className="input-field" value={filters.type} onChange={e => handleFilterChange('type', e.target.value)}>
                            <option value="">All Types</option>
                            {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                </div>
            )}

            {/* Jobs list */}
            {loading ? <LoadingSpinner text="Loading jobs..." /> : jobs.length === 0 ? (
                <EmptyState
                    icon={Briefcase}
                    title="No Jobs Found"
                    description="Try adjusting your filters or search terms"
                    action={hasFilters && <button onClick={clearFilters} className="btn-primary">Clear Filters</button>}
                />
            ) : (
                <>
                    <div className="space-y-3 mb-6">
                        {jobs.map(job => (
                            <Link
                                key={job._id}
                                to={`/jobs/${job._id}`}
                                className="card-hover p-5 flex items-center justify-between gap-4 block"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                                            <Briefcase className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-slate-900 truncate">{job.title}</h3>
                                            <p className="text-sm text-slate-500">{job.department}</p>
                                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                                    <MapPin className="w-3 h-3" /> {job.branch}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Briefcase className="w-3 h-3" /> {job.type}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Clock className="w-3 h-3" /> {timeAgo(job.createdAt)}
                                                </span>
                                                {job.seats && (
                                                    <span className="badge bg-green-100 text-green-700">{job.seats} seats</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 flex-shrink-0" />
                            </Link>
                        ))}
                    </div>
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
};

export default JobsPage;