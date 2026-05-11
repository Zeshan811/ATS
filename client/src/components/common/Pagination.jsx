import {
    ChevronLeft, ChevronRight
} from 'lucide-react';

const Pagination = ({ page, totalPages, onPageChange
}) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(page - 1)
                }
                disabled={page === 1
                }
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({
                length: totalPages
            }, (_, i) => i + 1).map((p) => (
                <button
                    key={p
                    }
                    onClick={() => onPageChange(p)
                    }
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${p === page
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'border border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`
                    }
                >
                    {p
                    }
                </button>
            ))
            }
            <button
                onClick={() => onPageChange(page + 1)
                }
                disabled={page === totalPages
                }
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;