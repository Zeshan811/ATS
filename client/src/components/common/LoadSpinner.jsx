const LoadingSpinner = ({ fullScreen = false, size = 'md', text = ''
}) => {
    const sizes = {
        sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12'
    };

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-50 z-50">
                <div className="flex flex-col items-center gap-4">
                    <div className={`${sizes.lg
                        } border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`
                    } />
                    <p className="text-slate-500 font-medium text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
                <div className={`${sizes[size
                ]
                    } border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`
                } />
                {text && <p className="text-slate-500 text-sm">{text
                }</p>
                }
            </div>
        </div>
    );
};

export default LoadingSpinner;