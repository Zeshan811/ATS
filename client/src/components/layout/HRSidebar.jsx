import {
    NavLink, useNavigate
} from 'react-router-dom';
import {
    useAuth
} from '../../context/AuthContext';
import {
    LayoutDashboard, Briefcase, Users, Building2, Calendar, LogOut, X, Briefcase as BriefcaseIcon, User
} from 'lucide-react';

const links = [
    {
        to: '/hr/dashboard', icon: LayoutDashboard, label: 'Dashboard'
    },
    {
        to: '/hr/jobs', icon: Briefcase, label: 'Job Management'
    },
    {
        to: '/hr/applicants', icon: Users, label: 'Applicants'
    },
    {
        to: '/hr/interviews', icon: Calendar, label: 'Interviews'
    },
    {
        to: '/hr/branches', icon: Building2, label: 'Branches'
    },
];

const HRSidebar = ({ onClose
}) => {
    const { user, logout
    } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); navigate('/');
    };

    return (
        <div className="h-full flex flex-col bg-slate-900 w-64">
            { /* Logo */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
                        <BriefcaseIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold text-white">HireHub HR</span>
                </div>
                {onClose && (
                    <button onClick={onClose
                    } className="p-1 rounded-lg hover:bg-slate-800 lg:hidden">
                        <X className="w-4 h-4 text-slate-400" />
                    </button>
                )
                }
            </div>

            { /* User info */}
            <div className="px-5 py-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user?.name
                        }</p>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-900 text-primary-300 capitalize">
                            {user?.role
                            }
                        </span>
                    </div>
                </div>
            </div>

            { /* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {links.map(({ to, icon: Icon, label
                }) => (
                    <NavLink
                        key={to
                        }
                        to={to
                        }
                        onClick={onClose
                        }
                        className={({ isActive
                        }) =>
                            isActive
                                ? 'flex items-center gap-3 px-4 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-sm'
                                : 'flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white font-medium text-sm transition-all duration-200'
                        }
                    >
                        <Icon className="w-4 h-4" />
                        {label
                        }
                    </NavLink>
                ))
                }
            </nav>

            { /* Logout */}
            <div className="px-3 py-4 border-t border-slate-800">
                <button
                    onClick={handleLogout
                    }
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-900/30 hover:text-red-300 font-medium text-sm transition-all w-full"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default HRSidebar;