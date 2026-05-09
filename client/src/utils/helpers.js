export const STATUS_CONFIG = {
    submitted: {
        label: 'Submitted',
        color: 'bg-blue-100 text-blue-700',
        dot: 'bg-blue-500',
    },
    under_review: {
        label: 'Under Review',
        color: 'bg-amber-100 text-amber-700',
        dot: 'bg-amber-500',
    },
    shortlisted: {
        label: 'Shortlisted',
        color: 'bg-purple-100 text-purple-700',
        dot: 'bg-purple-500',
    },
    interview_scheduled: {
        label: 'Interview Scheduled',
        color: 'bg-indigo-100 text-indigo-700',
        dot: 'bg-indigo-500',
    },
    rejected: {
        label: 'Rejected',
        color: 'bg-red-100 text-red-700',
        dot: 'bg-red-500',
    },
    selected: {
        label: 'Selected',
        color: 'bg-green-100 text-green-700',
        dot: 'bg-green-500',
    },
};

export const getStatusConfig = (status) =>
    STATUS_CONFIG[status
    ] || {
        label: status, color: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400'
    };

export const JOB_TYPES = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'
];
export const DEPARTMENTS = [
    'Engineering', 'Design', 'Product', 'Marketing',
    'Sales', 'HR', 'Finance', 'Operations', 'QA', 'DevOps',
];
export const BRANCHES = ['Islamabad', 'Lahore', 'Karachi', 'Remote'
];

export const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-PK',
        {
            day: 'numeric', month: 'short', year: 'numeric',
        });
};

export const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days
        } days ago`;
    if (days < 30) return `${Math.floor(days / 7)
        } weeks ago`;
    return `${Math.floor(days / 30)
        } months ago`;
};